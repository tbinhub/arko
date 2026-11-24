import type { ArchitectureNodeKind, NodeAccent } from "@/features/diagram/model/types";

export type NodeCatalogItem = {
    kind: ArchitectureNodeKind;
    label: string;
    description: string;
    icon: string;
    accent: NodeAccent;
    category: "Entry points" | "Application" | "Data" | "Integration";
};

export const nodeCatalog: NodeCatalogItem[] = [
    {
        kind: "client",
        label: "Client",
        description: "Web, mobile, or desktop application",
        icon: "monitor-smartphone",
        accent: "blue",
        category: "Entry points",
    },
    {
        kind: "external",
        label: "External system",
        description: "Third-party API or external dependency",
        icon: "cloud",
        accent: "slate",
        category: "Entry points",
    },
    {
        kind: "gateway",
        label: "API gateway",
        description: "Routing, authentication, and rate limiting",
        icon: "waypoints",
        accent: "violet",
        category: "Application",
    },
    {
        kind: "service",
        label: "Service",
        description: "Deployable business capability",
        icon: "box",
        accent: "emerald",
        category: "Application",
    },
    {
        kind: "database",
        label: "Database",
        description: "Persistent structured storage",
        icon: "database",
        accent: "blue",
        category: "Data",
    },
    {
        kind: "cache",
        label: "Cache",
        description: "Low-latency temporary storage",
        icon: "memory-stick",
        accent: "rose",
        category: "Data",
    },
    {
        kind: "queue",
        label: "Message queue",
        description: "Asynchronous messaging and buffering",
        icon: "list-tree",
        accent: "amber",
        category: "Integration",
    },
];

export const nodeCatalogByKind = Object.fromEntries(
    nodeCatalog.map((item) => [item.kind, item]),
) as Record<ArchitectureNodeKind, NodeCatalogItem>;

export const catalogCategories = ["Entry points", "Application", "Data", "Integration"] as const;
