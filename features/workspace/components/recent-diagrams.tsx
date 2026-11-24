"use client";

import type { Route } from "next";
import Link from "next/link";
import { Clock3, FilePlus2, MoreHorizontal } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    getLocalDocumentSnapshot,
    subscribeToLocalDocuments,
} from "@/features/diagram/lib/document-repository";
import { DiagramPreview } from "./diagram-preview";

type DocumentSummary = {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
    nodeCount: number;
};

const emptySnapshot = "[]";
const accents = ["emerald", "blue", "violet", "amber"] as const;

function relativeTime(timestamp: string) {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(timestamp).getTime()) / 60_000));
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
}

export function RecentDiagrams() {
    const snapshot = useSyncExternalStore(
        subscribeToLocalDocuments,
        getLocalDocumentSnapshot,
        () => emptySnapshot,
    );
    const documents = useMemo(() => JSON.parse(snapshot) as DocumentSummary[], [snapshot]);

    if (documents.length === 0) {
        return (
            <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
                <span className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-xs">
                    <FilePlus2 className="size-4" />
                </span>
                <p className="mt-3 text-sm font-medium">No diagrams yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Choose a template above to create your first system.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document, index) => (
                <Link
                    key={document.id}
                    href={`/editor/${document.id}` as Route}
                    className="group outline-none"
                >
                    <Card className="gap-0 py-0 transition group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
                        <div className="h-44 border-b">
                            <DiagramPreview
                                accent={accents[index % accents.length]}
                                density="dense"
                            />
                        </div>
                        <CardHeader className="pt-4 pb-2">
                            <CardTitle className="flex items-center justify-between gap-3">
                                <span className="truncate">
                                    {document.title || "Untitled diagram"}
                                </span>
                                <MoreHorizontal className="size-4 shrink-0 text-muted-foreground" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <p className="truncate text-xs text-muted-foreground">
                                {document.description || "Architecture diagram"}
                            </p>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Clock3 className="size-3.5" />
                                    {relativeTime(document.updatedAt)}
                                </span>
                                <span>{document.nodeCount} nodes</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
