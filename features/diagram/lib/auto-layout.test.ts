import { describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { layoutDiagram } from "./auto-layout";

describe("automatic diagram layout", () => {
    it("lays connected nodes out from left to right", async () => {
        const document = createDiagramDocument("layout", "web-application");
        const positions = await layoutDiagram(document.nodes, document.edges);
        const client = positions.find((node) => node.id === "client");
        const database = positions.find((node) => node.id === "database");

        expect(positions).toHaveLength(document.nodes.length);
        expect(client?.position.x).toBeLessThan(database?.position.x ?? 0);
    });
});
