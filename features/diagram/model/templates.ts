import type { DiagramDocument, DiagramTemplateId } from "./types";
import { diagramSchemaVersion } from "./types";

const templateGraphs: Record<
    DiagramTemplateId,
    Pick<DiagramDocument, "title" | "description" | "nodes" | "edges">
> = {
    blank: {
        title: "Software Workflow",
        description: "",
        nodes: [],
        edges: [],
    },
};

export function createDiagramDocument(
    id: string,
    templateId: DiagramTemplateId = "blank",
): DiagramDocument {
    const template = templateGraphs[templateId];
    const timestamp = new Date().toISOString();

    return {
        schemaVersion: diagramSchemaVersion,
        id,
        title: template.title,
        description: template.description,
        createdAt: timestamp,
        updatedAt: timestamp,
        viewport: { x: 0, y: 0, zoom: 1 },
        nodes: structuredClone(template.nodes),
        edges: structuredClone(template.edges),
    };
}
