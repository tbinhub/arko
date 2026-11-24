"use client";

import { useEffect, useRef } from "react";
import { readLocalDocument, writeLocalDocument } from "@/features/diagram/lib/document-repository";
import { useDiagramStore } from "@/features/diagram/store/diagram-store-provider";

export function EditorPersistence() {
    const document = useDiagramStore((state) => state.document);
    const loadDocument = useDiagramStore((state) => state.loadDocument);
    const initialId = useRef(document.id);
    const isHydrated = useRef(false);

    useEffect(() => {
        if (!isHydrated.current) {
            const savedDocument = readLocalDocument(initialId.current);
            isHydrated.current = true;
            if (savedDocument) {
                loadDocument(savedDocument);
                return;
            }
        }

        const timeout = window.setTimeout(() => writeLocalDocument(document), 250);
        return () => window.clearTimeout(timeout);
    }, [document, loadDocument]);

    return null;
}
