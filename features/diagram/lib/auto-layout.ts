import type { ArchitectureEdge, ArchitectureNode } from "@/features/diagram/model/types";

const nodeWidth = 210;
const nodeHeight = 66;

export async function layoutDiagram(nodes: ArchitectureNode[], edges: ArchitectureEdge[]) {
    if (nodes.length === 0) return [];

    const { default: ELK } = await import("elkjs/lib/elk.bundled.js");
    const elk = new ELK();
    const graph = await elk.layout({
        id: "root",
        layoutOptions: {
            "elk.algorithm": "layered",
            "elk.direction": "RIGHT",
            "elk.spacing.nodeNode": "64",
            "elk.layered.spacing.nodeNodeBetweenLayers": "96",
            "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
        },
        children: nodes.map((node) => ({ id: node.id, width: nodeWidth, height: nodeHeight })),
        edges: edges.map((edge) => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
        })),
    });

    return (graph.children ?? []).map((node) => ({
        id: node.id,
        position: { x: node.x ?? 0, y: node.y ?? 0 },
    }));
}
