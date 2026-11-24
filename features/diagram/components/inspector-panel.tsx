"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "@/components/ui/empty";
import { MousePointer2 } from "lucide-react";
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
            <ScrollArea className="min-h-0 flex-1">
                {edge && selectedEdgeIds.length === 1 && selectedNodeIds.length === 0 ? (
                    <div className="space-y-5 p-4">
                        <Field>
                            <FieldLabel htmlFor={`${edge.id}-label`}>Flow label</FieldLabel>
                            <Input
                                id={`${edge.id}-label`}
                                key={`${edge.id}-label`}
                                defaultValue={edge.data?.label}
                                placeholder="e.g. request, publish"
                                onBlur={(event) => {
                                    const label = event.target.value.trim();
                                    if (label !== edge.data?.label) updateEdge(edge.id, { label });
                                }}
                                className="h-8 text-xs"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`${edge.id}-protocol`}>Protocol</FieldLabel>
                            <Input
                                id={`${edge.id}-protocol`}
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
                        </Field>
                        <Field
                            orientation="horizontal"
                            className="items-center rounded-lg border px-3 py-2 hover:bg-muted"
                        >
                            <FieldLabel htmlFor={`${edge.id}-animated`} className="flex-1">
                                Animate data flow
                            </FieldLabel>
                            <Switch
                                id={`${edge.id}-animated`}
                                checked={edge.data?.animated ?? false}
                                onCheckedChange={(checked) =>
                                    updateEdge(edge.id, { animated: checked })
                                }
                                aria-label="Animate data flow"
                            />
                        </Field>
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
                    <Empty className="min-h-72 border-0 p-6">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <MousePointer2 />
                            </EmptyMedia>
                            <EmptyDescription className="text-xs">
                                Select a component to edit its name, description, and appearance.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    <div className="space-y-5 p-4">
                        <Field>
                            <FieldLabel htmlFor={`${node.id}-label`}>Name</FieldLabel>
                            <Input
                                id={`${node.id}-label`}
                                key={`${node.id}-label`}
                                defaultValue={node.data.label}
                                onBlur={(event) => {
                                    const label = event.target.value.trim();
                                    if (label && label !== node.data.label)
                                        updateNode(node.id, { label });
                                }}
                                className="h-8 text-xs"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`${node.id}-description`}>Description</FieldLabel>
                            <Input
                                id={`${node.id}-description`}
                                key={`${node.id}-description`}
                                defaultValue={node.data.description}
                                onBlur={(event) => {
                                    const description = event.target.value.trim();
                                    if (description !== node.data.description)
                                        updateNode(node.id, { description });
                                }}
                                className="h-8 text-xs"
                            />
                        </Field>
                        <div className="space-y-2">
                            <p className="text-xs font-medium">Accent</p>
                            <ToggleGroup
                                value={[node.data.accent]}
                                onValueChange={(value) => {
                                    const accent = value[0] as NodeAccent | undefined;
                                    if (accent) updateNode(node.id, { accent });
                                }}
                                aria-label="Node accent"
                                size="sm"
                                className="gap-1"
                            >
                                {accents.map((accent) => (
                                    <ToggleGroupItem
                                        key={accent.value}
                                        value={accent.value}
                                        aria-label={`Use ${accent.value} accent`}
                                        className={cn(
                                            "size-7 rounded-full border-4 border-background p-0 ring-offset-2 transition-transform hover:scale-110 data-pressed:ring-2 data-pressed:ring-ring",
                                            accent.className,
                                        )}
                                    />
                                ))}
                            </ToggleGroup>
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
            </ScrollArea>
        </aside>
    );
}
