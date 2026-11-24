import { describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { createDiagramStore } from "@/features/diagram/store/diagram-store";
import { layoutDiagram } from "./auto-layout";

describe("automatic diagram layout", () => {
    it("lays connected nodes out from left to right", async () => {
        const store = createDiagramStore(createDiagramDocument("layout"));
        const clientId = store.getState().addNode("client", { x: 0, y: 0 });
        const databaseId = store.getState().addNode("database", { x: 0, y: 0 });
        store.getState().connect({
            source: clientId,
            target: databaseId,
            sourceHandle: null,
            targetHandle: null,
        });
        const document = store.getState().document;
        const positions = await layoutDiagram(document.nodes, document.edges);
        const client = positions.find((node) => node.id === clientId);
        const database = positions.find((node) => node.id === databaseId);

        expect(positions).toHaveLength(document.nodes.length);
        expect(client?.position.x).toBeLessThan(database?.position.x ?? 0);
    });
});
