import type { Connection, EdgeChangeset, NodeChangeset, Viewport, XYPosition } from "@xyflow/react";
import { nanoid } from "nanoid";
import { createStore } from "zustand/vanilla";
import { nodeCatalogByKind } from "@/features/diagram/model/catalog";
import type {
    ArchitectureEdge,
    ArchitectureNode,
    ArchitectureNodeKind,
    DiagramDocument,
} from "@/features/diagram/model/types";

type GraphSnapshot = Pick<DiagramDocument, "nodes" | "edges">;

type DiagramEditorState = {
    document: DiagramDocument;
    selectedNodeIds: string[];
    selectedEdgeIds: string[];
    past: GraphSnapshot[];
    future: GraphSnapshot[];
    onNodesChange: (changes: NodeChangeset<ArchitectureNode>) => void;
    onEdgesChange: (changes: EdgeChangeset<ArchitectureEdge>) => void;
    connect: (connection: Connection) => void;
    addNode: (kind: ArchitectureNodeKind, position: XYPosition) => string;
    updateNode: (nodeId: string, patch: Partial<ArchitectureNode["data"]>) => void;
    setSelection: (nodeIds: string[], edgeIds: string[]) => void;
    deleteSelection: () => void;
    beginTransaction: () => void;
    setTitle: (title: string) => void;
    setViewport: (viewport: Viewport) => void;
    loadDocument: (document: DiagramDocument) => void;
    setNodePositions: (positions: { id: string; position: XYPosition }[]) => void;
    undo: () => void;
    redo: () => void;
};

export type DiagramStore = ReturnType<typeof createDiagramStore>;

function cloneGraph(document: Pick<DiagramDocument, "nodes" | "edges">): GraphSnapshot {
    return {
        nodes: structuredClone(document.nodes),
        edges: structuredClone(document.edges),
    };
}

function withGraph(
    document: DiagramDocument,
    graph: GraphSnapshot,
    updatedAt = new Date().toISOString(),
): DiagramDocument {
    return { ...document, ...graph, updatedAt };
}

export function createDiagramStore(initialDocument: DiagramDocument) {
    return createStore<DiagramEditorState>()((set, get) => ({
        document: structuredClone(initialDocument),
        selectedNodeIds: [],
        selectedEdgeIds: [],
        past: [],
        future: [],

        onNodesChange: (changes) => {
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: changes.applyTo(state.document.nodes),
                    edges: state.document.edges,
                }),
            }));
        },

        onEdgesChange: (changes) => {
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: state.document.nodes,
                    edges: changes.applyTo(state.document.edges),
                }),
            }));
        },

        connect: (connection) => {
            if (
                !connection.source ||
                !connection.target ||
                connection.source === connection.target
            ) {
                return;
            }

            get().beginTransaction();
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: state.document.nodes,
                    edges: [
                        ...state.document.edges,
                        {
                            id: nanoid(),
                            source: connection.source,
                            target: connection.target,
                            sourceHandle: connection.sourceHandle,
                            targetHandle: connection.targetHandle,
                            type: "smoothstep",
                            data: { label: "", protocol: "HTTPS", animated: false },
                        },
                    ],
                }),
            }));
        },

        addNode: (kind, position) => {
            const catalogItem = nodeCatalogByKind[kind];
            const nodeId = nanoid();

            get().beginTransaction();
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: [
                        ...state.document.nodes,
                        {
                            id: nodeId,
                            type: "architecture",
                            position,
                            data: {
                                kind,
                                label: catalogItem.label,
                                description: catalogItem.description,
                                accent: catalogItem.accent,
                                icon: catalogItem.icon,
                            },
                        },
                    ],
                    edges: state.document.edges,
                }),
                selectedNodeIds: [nodeId],
                selectedEdgeIds: [],
            }));

            return nodeId;
        },

        updateNode: (nodeId, patch) => {
            const nodeExists = get().document.nodes.some((node) => node.id === nodeId);
            if (!nodeExists) return;

            get().beginTransaction();
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: state.document.nodes.map((node) =>
                        node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
                    ),
                    edges: state.document.edges,
                }),
            }));
        },

        setSelection: (selectedNodeIds, selectedEdgeIds) => {
            set({ selectedNodeIds, selectedEdgeIds });
        },

        deleteSelection: () => {
            const { selectedNodeIds, selectedEdgeIds, document } = get();
            if (selectedNodeIds.length === 0 && selectedEdgeIds.length === 0) return;

            get().beginTransaction();
            const nodeIds = new Set(selectedNodeIds);
            const edgeIds = new Set(selectedEdgeIds);

            set({
                document: withGraph(document, {
                    nodes: document.nodes.filter((node) => !nodeIds.has(node.id)),
                    edges: document.edges.filter(
                        (edge) =>
                            !edgeIds.has(edge.id) &&
                            !nodeIds.has(edge.source) &&
                            !nodeIds.has(edge.target),
                    ),
                }),
                selectedNodeIds: [],
                selectedEdgeIds: [],
            });
        },

        beginTransaction: () => {
            set((state) => ({
                past: [...state.past.slice(-49), cloneGraph(state.document)],
                future: [],
            }));
        },

        setTitle: (title) => {
            set((state) => ({
                document: { ...state.document, title, updatedAt: new Date().toISOString() },
            }));
        },

        setViewport: (viewport) => {
            set((state) => ({
                document: { ...state.document, viewport, updatedAt: new Date().toISOString() },
            }));
        },

        loadDocument: (document) => {
            set({
                document: structuredClone(document),
                selectedNodeIds: [],
                selectedEdgeIds: [],
                past: [],
                future: [],
            });
        },

        setNodePositions: (positions) => {
            if (positions.length === 0) return;
            get().beginTransaction();
            const positionsById = new Map(positions.map((item) => [item.id, item.position]));
            set((state) => ({
                document: withGraph(state.document, {
                    nodes: state.document.nodes.map((node) => ({
                        ...node,
                        position: positionsById.get(node.id) ?? node.position,
                    })),
                    edges: state.document.edges,
                }),
            }));
        },

        undo: () => {
            const state = get();
            const previous = state.past.at(-1);
            if (!previous) return;

            set({
                document: withGraph(state.document, previous),
                past: state.past.slice(0, -1),
                future: [cloneGraph(state.document), ...state.future.slice(0, 49)],
                selectedNodeIds: [],
                selectedEdgeIds: [],
            });
        },

        redo: () => {
            const state = get();
            const next = state.future[0];
            if (!next) return;

            set({
                document: withGraph(state.document, next),
                past: [...state.past.slice(-49), cloneGraph(state.document)],
                future: state.future.slice(1),
                selectedNodeIds: [],
                selectedEdgeIds: [],
            });
        },
    }));
}
