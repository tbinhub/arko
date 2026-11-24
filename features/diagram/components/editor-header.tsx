"use client";

import Link from "next/link";
import { Download, LayoutDashboard, LoaderCircle, Redo2, Undo2 } from "lucide-react";
import { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { BrandMark } from "@/components/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { layoutDiagram } from "@/features/diagram/lib/auto-layout";
import type { ArchitectureEdge, ArchitectureNode } from "@/features/diagram/model/types";
import { Separator } from "@/components/ui/separator";

export function EditorHeader() {
    const title = useDiagramStore((state) => state.document.title);
    const setTitle = useDiagramStore((state) => state.setTitle);
    const undo = useDiagramStore((state) => state.undo);
    const redo = useDiagramStore((state) => state.redo);
    const canUndo = useDiagramStore((state) => state.past.length > 0);
    const canRedo = useDiagramStore((state) => state.future.length > 0);
    const document = useDiagramStore((state) => state.document);
    const setNodePositions = useDiagramStore((state) => state.setNodePositions);
    const [isArranging, setIsArranging] = useState(false);
    const { fitView } = useReactFlow<ArchitectureNode, ArchitectureEdge>();

    async function arrangeDiagram() {
        setIsArranging(true);
        try {
            const positions = await layoutDiagram(document.nodes, document.edges);
            setNodePositions(positions);
            window.requestAnimationFrame(
                () => void fitView({ padding: 0.25, maxZoom: 1, duration: 300 }),
            );
        } finally {
            setIsArranging(false);
        }
    }

    return (
        <header className="flex h-14 shrink-0 items-center border-b bg-background px-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <BrandMark compact className="p-1 hover:bg-muted" />

                <Separator orientation="vertical" className="mx-1 h-6! w-px! shrink-0 bg-border" />
                <Input
                    value={title}
                    onInput={(event) => setTitle(event.currentTarget.value)}
                    aria-label="Software workflow title"
                    className="hidden h-8 max-w-56 border-transparent bg-transparent px-2 font-medium shadow-none hover:border-border focus-visible:border-border sm:block"
                />
            </div>
            <div className="flex items-center gap-1">
                <div className="hidden items-center gap-1 sm:flex">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={!canUndo}
                                    onClick={undo}
                                />
                            }
                        >
                            <Undo2 className="size-4.5" />
                            <span className="sr-only">Undo</span>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={!canRedo}
                                    onClick={redo}
                                />
                            }
                        >
                            <Redo2 className="size-4.5" />
                            <span className="sr-only">Redo</span>
                        </TooltipTrigger>
                        <TooltipContent>Redo</TooltipContent>
                    </Tooltip>
                </div>
                <Separator orientation="vertical" className="mx-2 h-5! w-px! shrink-0 bg-border" />
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden sm:inline-flex"
                                disabled={isArranging || document.nodes.length === 0}
                                onClick={arrangeDiagram}
                            />
                        }
                    >
                        {isArranging ? (
                            <LoaderCircle className="size-4.5 animate-spin" />
                        ) : (
                            <LayoutDashboard className="size-4.5" />
                        )}
                        <span className="sr-only">Auto arrange</span>
                    </TooltipTrigger>
                    <TooltipContent>Auto arrange</TooltipContent>
                </Tooltip>
                <Button variant="outline" size="default" className="hidden sm:inline-flex">
                    <Download className="size-4.5" />
                    Export
                </Button>
                <Link href="/" className={buttonVariants({ size: "default" })}>
                    Done
                </Link>
            </div>
        </header>
    );
}
