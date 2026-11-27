import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { CreateDiagramButton } from "@/features/workspace/components/create-diagram-button";
import { DiagramPreview } from "@/features/workspace/components/diagram-preview";
import { WorkflowTemplatePreview } from "@/features/workspace/components/workflow-template-preview";

export function WorkspaceHome() {
    return (
        <main className="min-h-dvh bg-background">
            <section className="relative isolate overflow-hidden border-b bg-background px-4 py-16 sm:px-6 sm:py-20">
                <div
                    aria-hidden="true"
                    className="arko-ambient-orb pointer-events-none absolute -top-52 -left-36 -z-10 size-[32rem] rounded-full bg-primary/12 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="arko-ambient-orb arko-ambient-orb--reverse pointer-events-none absolute -top-56 -right-40 -z-10 size-[34rem] rounded-full bg-chart-2/10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(color-mix(in_oklch,var(--border),transparent_12%)_1px,transparent_1px)] bg-size-[22px_22px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
                />
                <div className="arko-hero-enter mx-auto flex max-w-4xl flex-col items-center text-center">
                    <h1 className="max-w-4xl font-semibold tracking-tight text-balance">
                        <span className="mx-auto block w-fit bg-[linear-gradient(105deg,#007f4e_0%,#00c978_48%,#2583ff_100%)] bg-clip-text text-6xl leading-none text-transparent sm:text-8xl dark:bg-[linear-gradient(105deg,#61e9b0_0%,#22d391_48%,#60a5fa_100%)]">
                            Arko
                        </span>
                        <span className="mt-4 block text-3xl leading-tight sm:text-5xl">
                            Visualize systems.{" "}
                            <span className="text-primary">Simplify complexity.</span>
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground text-balance sm:text-lg">
                        Create a visual space for ideas, architecture, and system workflows.
                    </p>
                    <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                        <CreateDiagramButton className="h-10 px-5">
                            Create canvas
                        </CreateDiagramButton>
                        <Link
                            href="#templates"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "lg" }),
                                "h-10 gap-1.5 px-5",
                            )}
                        >
                            Explore templates
                            <ArrowRight />
                        </Link>
                    </div>
                </div>

                <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                    <Card className="group gap-0 overflow-hidden border-primary/15 bg-card py-0 shadow-[0_18px_60px_-48px_color-mix(in_oklch,var(--primary),black_38%)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_70px_-46px_color-mix(in_oklch,var(--primary),black_28%)]">
                        <div className="h-52 border-b sm:h-64">
                            <DiagramPreview accent="emerald" density="empty" />
                        </div>
                        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                            <div>
                                <h2 className="font-heading text-xl font-semibold tracking-tight">
                                    Create a new canvas
                                </h2>
                                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                    Start with an open canvas and shape the system your way.
                                </p>
                            </div>
                            <CreateDiagramButton variant="outline" className="h-10 sm:shrink-0">
                                Create canvas
                            </CreateDiagramButton>
                        </CardContent>
                    </Card>

                    <Link
                        href="#templates"
                        className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        <Card className="h-full gap-0 overflow-hidden border-chart-2/15 bg-card py-0 shadow-[0_18px_60px_-48px_color-mix(in_oklch,var(--chart-2),black_40%)] transition-[transform,border-color,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:border-chart-2/35 group-hover:shadow-[0_24px_70px_-46px_color-mix(in_oklch,var(--chart-2),black_30%)]">
                            <div className="h-52 border-b sm:h-64">
                                <WorkflowTemplatePreview />
                            </div>
                            <CardContent className="flex items-end justify-between gap-4 p-5 sm:p-6">
                                <div>
                                    <h2 className="font-heading text-xl font-semibold tracking-tight">
                                        Workflow templates
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                        Start from a template workflow.
                                    </p>
                                </div>
                                <ArrowRight className="mb-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>

            <section
                id="templates"
                className="relative isolate scroll-mt-6 overflow-hidden px-4 py-16 sm:px-6 sm:py-20"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-48 -bottom-56 -z-10 size-[34rem] rounded-full bg-primary/8 blur-3xl"
                />
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-xl">
                        <p className="text-sm font-medium text-primary">Arko library</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Workflow templates
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                            Start with a template architecture, system design, and workflow
                            diagrams.
                        </p>
                    </div>

                    <Empty className="mt-8 min-h-64 border border-primary/15 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary),transparent_92%),transparent_52%)] shadow-xs">
                        <EmptyHeader>
                            <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
                                <LayoutTemplate />
                            </EmptyMedia>
                            <EmptyTitle>Template library is coming next</EmptyTitle>
                            <EmptyDescription>
                                For now, start with a blank canvas. Curated Arko workflows will
                                appear here as they are ready.
                            </EmptyDescription>
                        </EmptyHeader>
                        <CreateDiagramButton variant="outline" className="h-10">
                            Create canvas
                        </CreateDiagramButton>
                    </Empty>
                </div>
            </section>
        </main>
    );
}
