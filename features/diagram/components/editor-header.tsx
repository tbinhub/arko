"use client";

import Link from "next/link";
import { Download, Redo2, Undo2 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { downloadDiagram } from "@/features/diagram/lib/export-document";

export function EditorHeader() {
    const title = useDiagramStore((state) => state.document.title);
    const setTitle = useDiagramStore((state) => state.setTitle);
    const undo = useDiagramStore((state) => state.undo);
    const redo = useDiagramStore((state) => state.redo);
    const canUndo = useDiagramStore((state) => state.past.length > 0);
    const canRedo = useDiagramStore((state) => state.future.length > 0);
    const document = useDiagramStore((state) => state.document);

    return (
        <header className="flex h-14 shrink-0 items-center border-b bg-background px-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <Link
                    href="/"
                    aria-label="Arko workspace"
                    className="rounded-lg p-1 hover:bg-muted"
                >
                    <BrandMark compact />
                </Link>
                <div className="mx-1 h-5 w-px bg-border" />
                <Input
                    value={title}
                    onInput={(event) => setTitle(event.currentTarget.value)}
                    aria-label="Diagram title"
                    className="h-8 max-w-56 border-transparent bg-transparent px-2 font-medium shadow-none hover:border-border focus-visible:border-border"
                />
            </div>
            <div className="flex items-center gap-1">
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={!canUndo}
                                onClick={undo}
                            />
                        }
                    >
                        <Undo2 />
                        <span className="sr-only">Undo</span>
                    </TooltipTrigger>
                    <TooltipContent>Undo</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={!canRedo}
                                onClick={redo}
                            />
                        }
                    >
                        <Redo2 />
                        <span className="sr-only">Redo</span>
                    </TooltipTrigger>
                    <TooltipContent>Redo</TooltipContent>
                </Tooltip>
                <div className="mx-2 h-5 w-px bg-border" />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadDiagram(document)}
                    className="hidden sm:inline-flex"
                >
                    <Download />
                    Export
                </Button>
                <Link href="/" className={buttonVariants({ size: "sm" })}>
                    Done
                </Link>
            </div>
        </header>
    );
}
