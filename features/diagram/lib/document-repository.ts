import type { DiagramDocument } from "@/features/diagram/model/types";
import { diagramDocumentSchema } from "@/features/diagram/model/schema";

const storagePrefix = "arko:diagram:";
const documentsChangedEvent = "arko:documents-changed";

function key(documentId: string) {
    return `${storagePrefix}${documentId}`;
}

export function readLocalDocument(documentId: string): DiagramDocument | null {
    try {
        const value = window.localStorage.getItem(key(documentId));
        if (!value) return null;

        const parsed = diagramDocumentSchema.safeParse(JSON.parse(value));
        return parsed.success ? (parsed.data as DiagramDocument) : null;
    } catch {
        return null;
    }
}

export function writeLocalDocument(document: DiagramDocument) {
    window.localStorage.setItem(key(document.id), JSON.stringify(document));
    window.dispatchEvent(new Event(documentsChangedEvent));
}

export function subscribeToLocalDocuments(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(documentsChangedEvent, onChange);

    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(documentsChangedEvent, onChange);
    };
}

export function getLocalDocumentSnapshot() {
    return JSON.stringify(
        listLocalDocuments().map(({ id, title, description, updatedAt, nodes }) => ({
            id,
            title,
            description,
            updatedAt,
            nodeCount: nodes.length,
        })),
    );
}

export function listLocalDocuments(): DiagramDocument[] {
    const documents: DiagramDocument[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
        const storageKey = window.localStorage.key(index);
        if (!storageKey?.startsWith(storagePrefix)) continue;

        const document = readLocalDocument(storageKey.slice(storagePrefix.length));
        if (document) documents.push(document);
    }

    return documents.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
