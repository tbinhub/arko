import type { DiagramDocument } from "@/features/diagram/model/types";
import { diagramDocumentSchema } from "@/features/diagram/model/schema";

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

export function parseDiagram(value: string, documentId: string): DiagramDocument {
    const result = diagramDocumentSchema.safeParse(JSON.parse(value));
    if (!result.success) throw new Error("This file is not a valid Arko diagram.");

    return {
        ...(result.data as DiagramDocument),
        id: documentId,
        updatedAt: new Date().toISOString(),
    };
}
