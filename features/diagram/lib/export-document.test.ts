import { describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { diagramFileName, serializeDiagram } from "./export-document";

describe("diagram export", () => {
    it("creates a portable versioned JSON document", () => {
        const document = createDiagramDocument("portable", "event-driven");
        const exported = JSON.parse(serializeDiagram(document));

        expect(exported).toMatchObject({ id: "portable", schemaVersion: 1 });
        expect(exported.nodes).toHaveLength(6);
    });

    it("creates a safe file name", () => {
        expect(diagramFileName("Commerce Platform / v2")).toBe("commerce-platform-v2.arko.json");
        expect(diagramFileName("  ")).toBe("untitled-diagram.arko.json");
    });
});
