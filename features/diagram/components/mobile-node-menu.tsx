"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nodeCatalog } from "@/features/diagram/model/catalog";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { NodeIcon } from "./node-icon";

export function MobileNodeMenu() {
    const addNode = useDiagramStore((state) => state.addNode);
    const nodeCount = useDiagramStore((state) => state.document.nodes.length);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<Button variant="outline" size="icon-sm" className="md:hidden" />}
            >
                <Plus />
                <span className="sr-only">Add component</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {nodeCatalog.map((item, index) => (
                    <DropdownMenuItem
                        key={item.kind}
                        onClick={() =>
                            addNode(item.kind, {
                                x: 100 + ((nodeCount + index) % 4) * 32,
                                y: 100 + ((nodeCount + index) % 4) * 40,
                            })
                        }
                    >
                        <NodeIcon name={item.icon} />
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
