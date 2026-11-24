"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
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
                <InputGroup className="mt-2">
                    <InputGroupAddon>
                        <Search className="size-3.5" />
                    </InputGroupAddon>
                    <InputGroupInput
                        value={query}
                        onInput={(event) => setQuery(event.currentTarget.value)}
                        placeholder="Search components"
                        aria-label="Search components"
                        className="text-xs"
                    />
                </InputGroup>
            </div>
            <ScrollArea className="min-h-0 flex-1">
                <div className="p-3">
                    {catalogCategories.map((category) => {
                        const items = filtered.filter((item) => item.category === category);
                        if (items.length === 0) return null;

                        return (
                            <section key={category} className="mb-5">
                                <h2 className="mb-2 px-1 text-[11px] font-medium text-muted-foreground">
                                    {category}
                                </h2>
                                <ItemGroup className="gap-1">
                                    {items.map((item) => (
                                        <Item
                                            key={item.kind}
                                            size="xs"
                                            render={<button type="button" />}
                                            draggable
                                            onDragStart={(event) => {
                                                event.dataTransfer.setData(dragType, item.kind);
                                                event.dataTransfer.effectAllowed = "copy";
                                            }}
                                            onClick={() => addToCanvas(item.kind)}
                                            className="cursor-grab flex-nowrap text-left hover:bg-muted active:cursor-grabbing"
                                        >
                                            <ItemMedia className="flex size-8 items-center justify-center rounded-lg border bg-card text-muted-foreground shadow-xs">
                                                <NodeIcon name={item.icon} className="size-4" />
                                            </ItemMedia>
                                            <ItemContent className="min-w-0">
                                                <ItemTitle className="text-xs">
                                                    {item.label}
                                                </ItemTitle>
                                                <ItemDescription className="line-clamp-1 text-[10px]">
                                                    {item.description}
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                    ))}
                                </ItemGroup>
                            </section>
                        );
                    })}
                </div>
            </ScrollArea>
        </aside>
    );
}

export { dragType };
