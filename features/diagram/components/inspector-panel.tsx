"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NodeAccent } from "@/features/diagram/model/types";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { cn } from "cn";

const accents: { value: NodeAccent; className: string }[] = [
    { value: "emerald", className: "bg-emerald-500" },
    { value: "blue", className: "bg-blue-500" },
    { value: "violet", className: "bg-violet-500" },
    { value: "amber", className: "bg-amber-500" },
    { value: "rose", className: "bg-rose-500" },
    { value: "slate", className: "bg-slate-500" },
];

export function InspectorPanel() {
    const selectedNodeIds = useDiagramStore((state) => state.selectedNodeIds);
    const node = useDiagramStore((state) =>
        state.document.nodes.find((item) => item.id === state.selectedNodeIds[0]),
    );
    const selectedEdgeIds = useDiagramStore((state) => state.selectedEdgeIds);
    const edge = useDiagramStore((state) =>
        state.document.edges.find((item) => item.id === state.selectedEdgeIds[0]),
    );
    const updateNode = useDiagramStore((state) => state.updateNode);
    const updateEdge = useDiagramStore((state) => state.updateEdge);
    const deleteSelection = useDiagramStore((state) => state.deleteSelection);

    return (
        <aside className="hidden w-72 shrink-0 border-l bg-background lg:flex lg:flex-col">
            <div className="border-b px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Inspector
                </p>
            </div>
            {edge && selectedEdgeIds.length === 1 && selectedNodeIds.length === 0 ? (
                <div className="space-y-5 p-4">
                    <label className="block space-y-1.5">
                        <span className="text-xs font-medium">Flow label</span>
                        <Input
                            key={`${edge.id}-label`}
                            defaultValue={edge.data?.label}
                            placeholder="e.g. request, publish"
                            onBlur={(event) => {
                                const label = event.target.value.trim();
                                if (label !== edge.data?.label) updateEdge(edge.id, { label });
                            }}
                            className="h-8 text-xs"
                        />
                    </label>
                    <label className="block space-y-1.5">
                        <span className="text-xs font-medium">Protocol</span>
                        <Input
                            key={`${edge.id}-protocol`}
                            defaultValue={edge.data?.protocol}
                            placeholder="HTTPS"
                            onBlur={(event) => {
                                const protocol = event.target.value.trim();
                                if (protocol !== edge.data?.protocol)
                                    updateEdge(edge.id, { protocol });
                            }}
                            className="h-8 text-xs"
                        />
                    </label>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={edge.data?.animated ?? false}
                        onClick={() => updateEdge(edge.id, { animated: !edge.data?.animated })}
                        className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted"
                    >
                        Animate data flow
                        <span
                            className={cn(
                                "relative h-5 w-9 rounded-full bg-muted-foreground/25 transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-background after:shadow-sm after:transition-transform",
                                edge.data?.animated && "bg-primary after:translate-x-4",
                            )}
                        />
                    </button>
                    <div className="border-t pt-4">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={deleteSelection}
                            className="w-full"
                        >
                            <Trash2 />
                            Delete connection
                        </Button>
                    </div>
                </div>
            ) : !node || selectedNodeIds.length !== 1 ? (
                <div className="flex flex-1 items-center justify-center p-6 text-center">
                    <p className="max-w-44 text-xs leading-5 text-muted-foreground">
                        Select a component to edit its name, description, and appearance.
                    </p>
                </div>
            ) : (
                <div className="space-y-5 p-4">
                    <label className="block space-y-1.5">
                        <span className="text-xs font-medium">Name</span>
                        <Input
                            key={`${node.id}-label`}
                            defaultValue={node.data.label}
                            onBlur={(event) => {
                                const label = event.target.value.trim();
                                if (label && label !== node.data.label)
                                    updateNode(node.id, { label });
                            }}
                            className="h-8 text-xs"
                        />
                    </label>
                    <label className="block space-y-1.5">
                        <span className="text-xs font-medium">Description</span>
                        <Input
                            key={`${node.id}-description`}
                            defaultValue={node.data.description}
                            onBlur={(event) => {
                                const description = event.target.value.trim();
                                if (description !== node.data.description)
                                    updateNode(node.id, { description });
                            }}
                            className="h-8 text-xs"
                        />
                    </label>
                    <div className="space-y-2">
                        <p className="text-xs font-medium">Accent</p>
                        <div className="flex gap-2">
                            {accents.map((accent) => (
                                <button
                                    key={accent.value}
                                    type="button"
                                    aria-label={`Use ${accent.value} accent`}
                                    onClick={() => updateNode(node.id, { accent: accent.value })}
                                    className={cn(
                                        "size-6 rounded-full border-2 border-background ring-offset-2 transition-transform hover:scale-110",
                                        accent.className,
                                        node.data.accent === accent.value && "ring-2 ring-ring",
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={deleteSelection}
                            className="w-full"
                        >
                            <Trash2 />
                            Delete component
                        </Button>
                    </div>
                </div>
            )}
        </aside>
    );
}
