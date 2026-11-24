"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { catalogCategories, nodeCatalog } from "@/features/diagram/model/catalog";
import type { ArchitectureNodeKind } from "@/features/diagram/model/types";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { NodeIcon } from "./node-icon";

const dragType = "application/arko-node";

export function NodePalette() {
    const [query, setQuery] = useState("");
    const addNode = useDiagramStore((state) => state.addNode);
    const nodes = useDiagramStore((state) => state.document.nodes);
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = useMemo(
        () =>
            nodeCatalog.filter((item) =>
                `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery),
            ),
        [normalizedQuery],
    );

    function addToCanvas(kind: ArchitectureNodeKind) {
        const offset = nodes.length % 6;
        addNode(kind, { x: 220 + offset * 36, y: 120 + offset * 42 });
    }

    return (
        <aside className="hidden w-64 shrink-0 flex-col border-r bg-background md:flex">
            <div className="border-b p-3">
                <p className="px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Components
                </p>
                <div className="relative mt-2">
                    <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search components"
                        className="h-8 pl-8 text-xs"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
                {catalogCategories.map((category) => {
                    const items = filtered.filter((item) => item.category === category);
                    if (items.length === 0) return null;

                    return (
                        <section key={category} className="mb-5">
                            <h2 className="mb-2 px-1 text-[11px] font-medium text-muted-foreground">
                                {category}
                            </h2>
                            <div className="space-y-1">
                                {items.map((item) => (
                                    <button
                                        key={item.kind}
                                        type="button"
                                        draggable
                                        onDragStart={(event) => {
                                            event.dataTransfer.setData(dragType, item.kind);
                                            event.dataTransfer.effectAllowed = "copy";
                                        }}
                                        onClick={() => addToCanvas(item.kind)}
                                        className="flex w-full cursor-grab items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted active:cursor-grabbing"
                                    >
                                        <span className="flex size-8 items-center justify-center rounded-lg border bg-card text-muted-foreground shadow-xs">
                                            <NodeIcon name={item.icon} className="size-4" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-xs font-medium">
                                                {item.label}
                                            </span>
                                            <span className="block truncate text-[10px] text-muted-foreground">
                                                {item.description}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </aside>
    );
}

export { dragType };
