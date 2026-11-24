import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, MoreHorizontal, Search } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateDiagramButton } from "@/features/workspace/components/create-diagram-button";
import { DiagramPreview } from "@/features/workspace/components/diagram-preview";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";
import { recentDiagrams, workspaceTemplates } from "@/features/workspace/model/workspace-data";

export function WorkspaceHome() {
    return (
        <main className="flex min-h-screen bg-background">
            <WorkspaceSidebar />
            <div className="min-w-0 flex-1">
                <header className="flex h-16 items-center justify-between border-b px-5 sm:px-8">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <BrandMark compact className="shrink-0 lg:hidden" />
                        <div className="relative w-full max-w-sm">
                            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                aria-label="Search diagrams"
                                placeholder="Search diagrams…"
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                        <CreateDiagramButton className="hidden sm:inline-flex" />
                        <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                            AR
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10">
                    <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <Badge variant="outline" className="mb-3">
                                Architecture workspace
                            </Badge>
                            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                Design systems that make sense.
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                Map architecture, explain data flow, and keep technical decisions in
                                one visual workspace.
                            </p>
                        </div>
                        <CreateDiagramButton className="sm:hidden" />
                    </section>

                    <section id="templates" className="mt-12 scroll-mt-6">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold tracking-tight">
                                    Start from a template
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Opinionated foundations for common system patterns.
                                </p>
                            </div>
                            <Link
                                href="#templates"
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "sm" }),
                                    "gap-1",
                                )}
                            >
                                View all
                                <ArrowRight />
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {workspaceTemplates.map((template) => (
                                <Card
                                    key={template.id}
                                    className="gap-0 py-0 transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="h-36 border-b">
                                        <DiagramPreview
                                            accent={template.accent}
                                            density={
                                                template.id === "blank"
                                                    ? "empty"
                                                    : template.nodes > 6
                                                      ? "dense"
                                                      : "simple"
                                            }
                                        />
                                    </div>
                                    <CardHeader className="pt-4 pb-2">
                                        <CardTitle>{template.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <p className="min-h-10 text-xs leading-5 text-muted-foreground">
                                            {template.description}
                                        </p>
                                        <CreateDiagramButton
                                            templateId={template.id}
                                            variant="outline"
                                            className="mt-3 w-full"
                                        >
                                            Use template
                                        </CreateDiagramButton>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section id="diagrams" className="mt-12 scroll-mt-6">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold tracking-tight">
                                Recent diagrams
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Pick up where you left off.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {recentDiagrams.map((diagram) => (
                                <Link
                                    key={diagram.id}
                                    href={`/editor/${diagram.id}` as Route}
                                    className="group outline-none"
                                >
                                    <Card className="gap-0 py-0 transition group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
                                        <div className="h-44 border-b">
                                            <DiagramPreview
                                                accent={diagram.accent}
                                                density="dense"
                                            />
                                        </div>
                                        <CardHeader className="pt-4 pb-2">
                                            <CardTitle className="flex items-center justify-between gap-3">
                                                <span>{diagram.name}</span>
                                                <MoreHorizontal className="size-4 text-muted-foreground" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pb-4">
                                            <p className="text-xs text-muted-foreground">
                                                {diagram.description}
                                            </p>
                                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock3 className="size-3.5" />
                                                    {diagram.updatedAt}
                                                </span>
                                                <span>{diagram.nodeCount} nodes</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
