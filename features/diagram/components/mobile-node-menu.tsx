"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { nodeCatalog } from "@/features/diagram/model/catalog";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { NodeIcon } from "./node-icon";

export function MobileNodeMenu() {
    const [open, setOpen] = useState(false);
    const addNode = useDiagramStore((state) => state.addNode);
    const nodeCount = useDiagramStore((state) => state.document.nodes.length);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={<Button variant="outline" size="icon-sm" className="md:hidden" />}
            >
                <Plus />
                <span className="sr-only">Add component</span>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[70svh] rounded-t-2xl">
                <SheetHeader>
                    <SheetTitle>Add component</SheetTitle>
                    <SheetDescription>
                        Choose an architecture component for the canvas.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="min-h-0 px-4 pb-4">
                    <div className="grid grid-cols-2 gap-2 pb-4">
                        {nodeCatalog.map((item, index) => (
                            <Button
                                key={item.kind}
                                variant="outline"
                                className="h-auto justify-start gap-2.5 p-3 text-left"
                                onClick={() => {
                                    addNode(item.kind, {
                                        x: 100 + ((nodeCount + index) % 4) * 32,
                                        y: 100 + ((nodeCount + index) % 4) * 40,
                                    });
                                    setOpen(false);
                                }}
                            >
                                <NodeIcon name={item.icon} />
                                <span className="truncate">{item.label}</span>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
