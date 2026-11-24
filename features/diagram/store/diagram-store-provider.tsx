"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";
import type { DiagramDocument } from "@/features/diagram/model/types";
import { createDiagramStore, type DiagramStore } from "./diagram-store";

const DiagramStoreContext = createContext<DiagramStore | null>(null);

export function DiagramStoreProvider({
    initialDocument,
    children,
}: {
    initialDocument: DiagramDocument;
    children: ReactNode;
}) {
    const [store] = useState(() => createDiagramStore(initialDocument));

    return <DiagramStoreContext value={store}>{children}</DiagramStoreContext>;
}

export function useDiagramStore<T>(selector: (state: ReturnType<DiagramStore["getState"]>) => T) {
    const store = useContext(DiagramStoreContext);

    if (!store) {
        throw new Error("useDiagramStore must be used within DiagramStoreProvider");
    }

    return useStore(store, selector);
}
