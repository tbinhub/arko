import { z } from "zod";
import { architectureNodeKinds, diagramSchemaVersion } from "./types";

const positionSchema = z.object({ x: z.number(), y: z.number() });

const nodeSchema = z.object({
    id: z.string().min(1),
    type: z.literal("architecture"),
    position: positionSchema,
    data: z.object({
        label: z.string(),
        description: z.string(),
        kind: z.enum(architectureNodeKinds),
        accent: z.enum(["emerald", "blue", "violet", "amber", "rose", "slate"]),
        icon: z.string(),
    }),
});

const edgeSchema = z.object({
    id: z.string().min(1),
    source: z.string().min(1),
    target: z.string().min(1),
    sourceHandle: z.string().nullable().optional(),
    targetHandle: z.string().nullable().optional(),
    type: z
        .union([z.literal("architecture"), z.literal("smoothstep")])
        .transform(() => "architecture" as const),
    data: z.object({
        label: z.string(),
        protocol: z.string(),
        animated: z.boolean(),
    }),
});

export const diagramDocumentSchema = z.object({
    schemaVersion: z.literal(diagramSchemaVersion),
    id: z.string().min(1),
    title: z.string(),
    description: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    viewport: z.object({ x: z.number(), y: z.number(), zoom: z.number().positive() }),
    nodes: z.array(nodeSchema),
    edges: z.array(edgeSchema),
});
