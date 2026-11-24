"use client";

import Link from "next/link";
import {
    Download,
    FileJson,
    FileUp,
    ImageIcon,
    LayoutDashboard,
    LoaderCircle,
    Redo2,
    Undo2,
} from "lucide-react";
import { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { BrandMark } from "@/components/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";
import { downloadDiagram, parseDiagram } from "@/features/diagram/lib/export-document";
import { layoutDiagram } from "@/features/diagram/lib/auto-layout";
import type { ArchitectureEdge, ArchitectureNode } from "@/features/diagram/model/types";
import { downloadDiagramPng } from "@/features/diagram/lib/export-image";
import { Separator } from "@/components/ui/separator";
import { ImportDiagramDialog } from "./import-diagram-dialog";
import { toast } from "sonner";

export function EditorHeader() {
    const title = useDiagramStore((state) => state.document.title);
    const setTitle = useDiagramStore((state) => state.setTitle);
    const undo = useDiagramStore((state) => state.undo);
    const redo = useDiagramStore((state) => state.redo);
    const canUndo = useDiagramStore((state) => state.past.length > 0);
    const canRedo = useDiagramStore((state) => state.future.length > 0);
    const document = useDiagramStore((state) => state.document);
    const setNodePositions = useDiagramStore((state) => state.setNodePositions);
    const loadDocument = useDiagramStore((state) => state.loadDocument);
    const [isArranging, setIsArranging] = useState(false);
    const [isExportingImage, setIsExportingImage] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
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

    async function exportImage() {
        setIsExportingImage(true);
        try {
            await downloadDiagramPng(document.nodes, document.title);
        } finally {
            setIsExportingImage(false);
        }
    }

    async function importDocument(file: File) {
        try {
            loadDocument(parseDiagram(await file.text(), document.id));
            window.requestAnimationFrame(
                () => void fitView({ padding: 0.25, maxZoom: 1, duration: 300 }),
            );
            toast.success("Diagram imported");
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to import this diagram.");
            return false;
        }
    }

    return (
        <header className="flex h-14 shrink-0 items-center border-b bg-background px-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <BrandMark compact className="p-1 hover:bg-muted" />
                <Separator orientation="vertical" className="mx-1 h-5!" />
                <Input
                    value={title}
                    onInput={(event) => setTitle(event.currentTarget.value)}
                    aria-label="Diagram title"
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
                </div>
                <Separator orientation="vertical" className="mx-2 h-5!" />
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                className="hidden sm:inline-flex"
                                disabled={isArranging || document.nodes.length === 0}
                                onClick={arrangeDiagram}
                            />
                        }
                    >
                        {isArranging ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            <LayoutDashboard />
                        )}
                        <span className="sr-only">Auto arrange</span>
                    </TooltipTrigger>
                    <TooltipContent>Auto arrange</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="outline" size="sm" className="hidden sm:inline-flex" />
                        }
                    >
                        {isExportingImage ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            <Download />
                        )}
                        Export
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => downloadDiagram(document)}>
                            <FileJson />
                            Arko JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={document.nodes.length === 0 || isExportingImage}
                            onClick={exportImage}
                        >
                            <ImageIcon />
                            PNG image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsImportOpen(true)}>
                            <FileUp />
                            Import Arko JSON
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ImportDiagramDialog
                    open={isImportOpen}
                    onOpenChange={setIsImportOpen}
                    onImport={importDocument}
                />
                <Link href="/" className={buttonVariants({ size: "sm" })}>
                    Done
                </Link>
            </div>
        </header>
    );
}
