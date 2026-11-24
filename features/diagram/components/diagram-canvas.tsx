"use client";

import {
    Background,
    BackgroundVariant,
    ConnectionMode,
    Controls,
    MarkerType,
    ReactFlow,
    SelectionMode,
    useReactFlow,
    type NodeTypes,
    type EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import type { DragEvent } from "react";
import type {
    ArchitectureEdge,
    ArchitectureNode,
    ArchitectureNodeKind,
} from "@/features/diagram/model/types";
import { architectureNodeKinds } from "@/features/diagram/model/types";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { ArchitectureNodeComponent } from "./architecture-node";
import { ArchitectureEdgeComponent } from "./architecture-edge";
import { dragType } from "./node-palette";

const nodeTypes: NodeTypes = { architecture: ArchitectureNodeComponent };
const edgeTypes: EdgeTypes = { architecture: ArchitectureEdgeComponent };
const architectureKinds = new Set<string>(architectureNodeKinds);

export function DiagramCanvas() {
    const nodes = useDiagramStore((state) => state.document.nodes);
    const edges = useDiagramStore((state) => state.document.edges);
    const onNodesChange = useDiagramStore((state) => state.onNodesChange);
    const onEdgesChange = useDiagramStore((state) => state.onEdgesChange);
    const connect = useDiagramStore((state) => state.connect);
    const addNode = useDiagramStore((state) => state.addNode);
    const setSelection = useDiagramStore((state) => state.setSelection);
    const beginTransaction = useDiagramStore((state) => state.beginTransaction);
    const setViewport = useDiagramStore((state) => state.setViewport);
    const viewport = useDiagramStore((state) => state.document.viewport);
    const { screenToFlowPosition } = useReactFlow<ArchitectureNode, ArchitectureEdge>();

    const onDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const kind = event.dataTransfer.getData(dragType);
            if (!architectureKinds.has(kind)) return;
            addNode(
                kind as ArchitectureNodeKind,
                screenToFlowPosition({ x: event.clientX, y: event.clientY }),
            );
        },
        [addNode, screenToFlowPosition],
    );

    return (
        <div
            className="min-w-0 flex-1 bg-muted/20"
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
        >
            <ReactFlow<ArchitectureNode, ArchitectureEdge>
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={connect}
                onNodeDragStart={beginTransaction}
                onSelectionChange={({ nodes: selectedNodes, edges: selectedEdges }) =>
                    setSelection(
                        selectedNodes.map(({ id }) => id),
                        selectedEdges.map(({ id }) => id),
                    )
                }
                connectionMode={ConnectionMode.Loose}
                selectionMode={SelectionMode.Partial}
                deleteKeyCode={null}
                snapToGrid
                snapGrid={[16, 16]}
                fitView
                defaultViewport={viewport}
                onMoveEnd={(_, nextViewport) => setViewport(nextViewport)}
                fitViewOptions={{ padding: 0.25, maxZoom: 1 }}
                minZoom={0.2}
                maxZoom={2}
                defaultEdgeOptions={{
                    type: "architecture",
                    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
                    style: { strokeWidth: 1.5 },
                }}
                className="arko-canvas"
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1.2}
                    color="var(--border)"
                />
                <Controls position="bottom-left" showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
