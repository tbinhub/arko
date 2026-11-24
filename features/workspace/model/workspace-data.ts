export const templateIds = ["blank"] as const;

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
];
