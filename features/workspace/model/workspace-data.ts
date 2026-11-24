export const templateIds = ["blank", "web-application", "microservices", "event-driven"] as const;

export type TemplateId = (typeof templateIds)[number];

export type WorkspaceTemplate = {
    id: TemplateId;
    name: string;
    description: string;
    accent: "emerald" | "blue" | "violet" | "amber";
    nodes: number;
};

export const workspaceTemplates: WorkspaceTemplate[] = [
    {
        id: "blank",
        name: "Blank canvas",
        description: "Start with an empty infinite canvas.",
        accent: "emerald",
        nodes: 0,
    },
    {
        id: "web-application",
        name: "Web application",
        description: "Client, API, cache, and database starter.",
        accent: "blue",
        nodes: 5,
    },
    {
        id: "microservices",
        name: "Microservices",
        description: "Gateway, services, queue, and storage.",
        accent: "violet",
        nodes: 7,
    },
    {
        id: "event-driven",
        name: "Event-driven system",
        description: "Producers, event bus, and consumers.",
        accent: "amber",
        nodes: 6,
    },
];
