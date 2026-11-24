import { describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { createDiagramStore } from "@/features/diagram/store/diagram-store";

describe("diagram store", () => {
    it("adds, updates, undoes, and redoes a node command", () => {
        const store = createDiagramStore(createDiagramDocument("test", "blank"));

        const nodeId = store.getState().addNode("service", { x: 120, y: 80 });
        expect(store.getState().document.nodes).toHaveLength(1);
        expect(store.getState().document.nodes[0]?.data.label).toBe("Service");

        store.getState().updateNode(nodeId, { label: "Checkout service" });
        expect(store.getState().document.nodes[0]?.data.label).toBe("Checkout service");

        store.getState().undo();
        expect(store.getState().document.nodes[0]?.data.label).toBe("Service");

        store.getState().undo();
        expect(store.getState().document.nodes).toHaveLength(0);

        store.getState().redo();
        expect(store.getState().document.nodes).toHaveLength(1);
    });

    it("removes connected edges when deleting a node", () => {
        const store = createDiagramStore(createDiagramDocument("test", "web-application"));
        const initialEdges = store.getState().document.edges.length;

        store.getState().setSelection(["gateway"], []);
        store.getState().deleteSelection();

        expect(store.getState().document.nodes.some((node) => node.id === "gateway")).toBe(false);
        expect(store.getState().document.edges.length).toBeLessThan(initialEdges);
        expect(
            store
                .getState()
                .document.edges.some(
                    (edge) => edge.source === "gateway" || edge.target === "gateway",
                ),
        ).toBe(false);
    });
});
