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
        const store = createDiagramStore(createDiagramDocument("test"));
        const gatewayId = store.getState().addNode("gateway", { x: 0, y: 0 });
        const serviceId = store.getState().addNode("service", { x: 240, y: 0 });
        store.getState().connect({
            source: gatewayId,
            target: serviceId,
            sourceHandle: null,
            targetHandle: null,
        });

        store.getState().setSelection([gatewayId], []);
        store.getState().deleteSelection();

        expect(store.getState().document.nodes.some((node) => node.id === gatewayId)).toBe(false);
        expect(store.getState().document.edges).toHaveLength(0);
        expect(
            store
                .getState()
                .document.edges.some(
                    (edge) => edge.source === gatewayId || edge.target === gatewayId,
                ),
        ).toBe(false);
    });
});
