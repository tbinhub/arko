"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { useEffect, type ReactNode } from "react";
import type { DiagramDocument } from "@/features/diagram/model/types";
import {
    DiagramStoreProvider,
    useDiagramStore,
} from "@/features/diagram/store/diagram-store-provider";
import { DiagramCanvas } from "./diagram-canvas";
import { EditorHeader } from "./editor-header";
import { EditorPersistence } from "./editor-persistence";

function EditorKeyboardShortcuts({ children }: { children: ReactNode }) {
    const undo = useDiagramStore((state) => state.undo);
    const redo = useDiagramStore((state) => state.redo);
    const deleteSelection = useDiagramStore((state) => state.deleteSelection);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            )
                return;

            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
                event.preventDefault();
                if (event.shiftKey) redo();
                else undo();
            }

            if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                deleteSelection();
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [deleteSelection, redo, undo]);

    return children;
}

export function EditorShell({ initialDocument }: { initialDocument: DiagramDocument }) {
    return (
        <DiagramStoreProvider initialDocument={initialDocument}>
            <ReactFlowProvider>
                <EditorKeyboardShortcuts>
                    <EditorPersistence />
                    <main className="flex h-dvh flex-col overflow-hidden bg-background">
                        <EditorHeader />
                        <div className="flex min-h-0 flex-1">
                            <DiagramCanvas />
                        </div>
                    </main>
                </EditorKeyboardShortcuts>
            </ReactFlowProvider>
        </DiagramStoreProvider>
    );
}
