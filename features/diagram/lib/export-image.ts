import { getNodesBounds, getViewportForBounds } from "@xyflow/react";
import type { ArchitectureNode } from "@/features/diagram/model/types";
import { diagramFileName } from "./export-document";

export async function downloadDiagramPng(nodes: ArchitectureNode[], title: string) {
    const viewport = window.document.querySelector<HTMLElement>(".react-flow__viewport");
    if (!viewport || nodes.length === 0) return;

    const bounds = getNodesBounds(nodes);
    const width = Math.min(2400, Math.max(960, Math.ceil(bounds.width + 240)));
    const height = Math.min(1600, Math.max(600, Math.ceil(bounds.height + 240)));
    const { x, y, zoom } = getViewportForBounds(bounds, width, height, 0.2, 1.5, 0.12);
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(viewport, {
        backgroundColor: "#ffffff",
        width,
        height,
        pixelRatio: 2,
        style: {
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        },
    });
    const anchor = window.document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = diagramFileName(title).replace(".arko.json", ".png");
    anchor.click();
}
