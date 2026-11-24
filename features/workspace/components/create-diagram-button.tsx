"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TemplateId } from "@/features/workspace/model/workspace-data";

type CreateDiagramButtonProps = {
    templateId?: TemplateId;
    children?: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    className?: string;
};

export function CreateDiagramButton({
    templateId = "blank",
    children = "New diagram",
    variant = "default",
    className,
}: CreateDiagramButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function createDiagram() {
        const documentId = crypto.randomUUID();
        const href = `/editor/${documentId}?template=${templateId}` as Route;

        startTransition(() => router.push(href));
    }

    return (
        <Button
            type="button"
            size="lg"
            variant={variant}
            className={className}
            disabled={isPending}
            onClick={createDiagram}
        >
            <Plus />
            {isPending ? "Creating…" : children}
        </Button>
    );
}
