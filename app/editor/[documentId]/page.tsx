import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Editor",
    robots: { index: false, follow: false },
};

export default async function EditorPage({ params }: PageProps<"/editor/[documentId]">) {
    const { documentId } = await params;

    return (
        <main className="flex min-h-screen flex-col bg-muted/30">
            <header className="flex h-14 items-center justify-between border-b bg-background px-4">
                <div className="flex items-center gap-3">
                    <BrandMark compact />
                    <div className="h-5 w-px bg-border" />
                    <span className="text-sm font-medium">Untitled diagram</span>
                </div>
                <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    <ArrowLeft />
                    Workspace
                </Link>
            </header>
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
                    <p className="font-mono text-xs text-muted-foreground">{documentId}</p>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        Canvas is ready next
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        The editor route is isolated and ready for the interactive graph runtime.
                    </p>
                </div>
            </div>
        </main>
    );
}
