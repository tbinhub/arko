import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CreateDiagramButton } from "@/features/workspace/components/create-diagram-button";
import { DiagramPreview } from "@/features/workspace/components/diagram-preview";
import { workspaceTemplates } from "@/features/workspace/model/workspace-data";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function WorkspaceHome() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">Arko</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Workspace</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <CreateDiagramButton className="mr-4 ml-auto hidden sm:inline-flex" />
                </header>

                <div className="px-6 py-8 sm:px-8 lg:px-10">
                    <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                                Software Workflow
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                A workspace for architecture, diagrams, and workflows.
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
                                    Choose a pattern to start your design.
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
                        <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-1">
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
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
