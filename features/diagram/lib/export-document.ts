import type { DiagramDocument } from "@/features/diagram/model/types";

export function serializeDiagram(document: DiagramDocument) {
    return JSON.stringify(document, null, 2);
}

export function diagramFileName(title: string) {
    const slug = title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return `${slug || "untitled-diagram"}.arko.json`;
}

export function downloadDiagram(document: DiagramDocument) {
    const blob = new Blob([serializeDiagram(document)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = diagramFileName(document.title);
    anchor.click();
    URL.revokeObjectURL(url);
}
