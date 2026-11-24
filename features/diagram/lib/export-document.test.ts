import { describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { diagramFileName, parseDiagram, serializeDiagram } from "./export-document";

describe("diagram export", () => {
    it("creates a portable versioned JSON document", () => {
        const document = createDiagramDocument("portable");
        const exported = JSON.parse(serializeDiagram(document));

        expect(exported).toMatchObject({ id: "portable", schemaVersion: 1 });
        expect(exported.nodes).toEqual([]);
    });

    it("creates a safe file name", () => {
        expect(diagramFileName("Commerce Platform / v2")).toBe("commerce-platform-v2.arko.json");
        expect(diagramFileName("  ")).toBe("untitled-diagram.arko.json");
    });

    it("validates imported diagrams and adopts the current route identity", () => {
        const portable = createDiagramDocument("source");
        const imported = parseDiagram(serializeDiagram(portable), "destination");

        expect(imported.id).toBe("destination");
        expect(imported.nodes).toEqual([]);
        expect(() => parseDiagram('{"schemaVersion":99}', "destination")).toThrow(
            "valid Arko diagram",
        );
    });
});
