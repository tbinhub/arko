import type { Metadata } from "next";
import { connection } from "next/server";
import { EditorShell } from "@/features/diagram/components/editor-shell";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import type { DiagramTemplateId } from "@/features/diagram/model/types";
import { templateIds } from "@/features/workspace/model/workspace-data";

export const metadata: Metadata = {
    title: "Editor",
    robots: { index: false, follow: false },
};

function isTemplateId(value: string | undefined): value is DiagramTemplateId {
    return templateIds.includes(value as DiagramTemplateId);
}

export default async function EditorPage({
    params,
    searchParams,
}: PageProps<"/editor/[documentId]">) {
    const { documentId } = await params;
    const query = await searchParams;
    const requestedTemplate = Array.isArray(query.template) ? query.template[0] : query.template;
    const templateId = isTemplateId(requestedTemplate) ? requestedTemplate : "blank";
    await connection();
    const initialDocument = createDiagramDocument(documentId, templateId);

    return <EditorShell initialDocument={initialDocument} />;
}
