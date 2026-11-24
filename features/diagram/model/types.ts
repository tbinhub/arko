import type { Edge, Node, Viewport, XYPosition } from "@xyflow/react";

export const diagramSchemaVersion = 1 as const;

export const architectureNodeKinds = [
    "client",
    "gateway",
    "service",
    "database",
    "cache",
    "queue",
    "external",
] as const;

export type ArchitectureNodeKind = (typeof architectureNodeKinds)[number];

export type NodeAccent = "emerald" | "blue" | "violet" | "amber" | "rose" | "slate";

export type ArchitectureNodeData = {
    label: string;
    description: string;
    kind: ArchitectureNodeKind;
    accent: NodeAccent;
    icon: string;
};

export type ArchitectureNode = Node<ArchitectureNodeData, "architecture">;

export type ArchitectureEdgeData = {
    label: string;
    protocol: string;
    animated: boolean;
};

export type ArchitectureEdge = Edge<ArchitectureEdgeData, "architecture">;

export type DiagramDocument = {
    schemaVersion: typeof diagramSchemaVersion;
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    viewport: Viewport;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
};

export type DiagramTemplateId = "blank" | "web-application" | "microservices" | "event-driven";

export type NewNodeInput = {
    kind: ArchitectureNodeKind;
    position: XYPosition;
};
