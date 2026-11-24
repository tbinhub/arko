import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { CreateDiagramButton } from "@/features/workspace/components/create-diagram-button";
import { DiagramPreview } from "@/features/workspace/components/diagram-preview";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";
import { workspaceTemplates } from "@/features/workspace/model/workspace-data";
import { RecentDiagrams } from "@/features/workspace/components/recent-diagrams";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function WorkspaceHome() {
    return (
        <SidebarProvider>
            <WorkspaceSidebar />
            <SidebarInset className="min-w-0">
                <header className="flex h-16 items-center justify-between border-b px-5 sm:px-8">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <SidebarTrigger />
                        <BrandMark compact className="shrink-0 md:hidden" />
                        <InputGroup className="w-full max-w-sm">
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupInput
                                aria-label="Search diagrams"
                                placeholder="Search diagrams…"
                            />
                        </InputGroup>
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                        <CreateDiagramButton className="hidden sm:inline-flex" />
                        <Avatar className="size-8">
                            <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
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
                        <RecentDiagrams />
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
