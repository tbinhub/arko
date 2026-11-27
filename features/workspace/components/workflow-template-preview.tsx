export function WorkflowTemplatePreview() {
    return (
        <div className="relative h-full min-h-52 overflow-hidden bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] sm:min-h-64">
            <div className="absolute -top-24 -right-20 size-64 rounded-full bg-chart-2/14 blur-3xl transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-3" />
            <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-primary/12 blur-3xl transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-3" />

            <svg
                aria-hidden="true"
                className="absolute inset-0 size-full"
                viewBox="0 0 360 240"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <path
                    d="M70 120H128C144 120 144 72 160 72H196"
                    className="text-border"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M70 120H128C144 120 144 168 160 168H196"
                    className="text-border"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M238 72H264C280 72 280 120 296 120"
                    className="text-border"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M238 168H264C280 168 280 120 296 120"
                    className="text-border"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M70 120H128C144 120 144 72 160 72H196"
                    className="arko-edge-flow text-primary"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M238 168H264C280 168 280 120 296 120"
                    className="arko-edge-flow text-chart-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>

            <div className="absolute top-1/2 left-[8%] flex h-14 w-[18%] min-w-14 -translate-y-1/2 items-center gap-2 rounded-xl border border-primary/25 bg-background p-2.5 shadow-sm transition-transform duration-200 group-hover:-translate-y-[54%]">
                <span className="size-3 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary),transparent_86%)]" />
                <span className="h-1.5 min-w-0 flex-1 rounded-full bg-foreground/15" />
            </div>

            <div className="absolute top-[18%] left-[44%] flex h-14 w-[23%] min-w-16 items-center gap-2 rounded-xl border border-chart-2/25 bg-background p-2.5 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-chart-2/12">
                    <span className="size-2 rounded-sm bg-chart-2" />
                </span>
                <span className="space-y-1.5">
                    <span className="block h-1.5 w-7 rounded-full bg-foreground/20" />
                    <span className="block h-1.5 w-5 rounded-full bg-foreground/10" />
                </span>
            </div>

            <div className="absolute bottom-[18%] left-[44%] flex h-14 w-[23%] min-w-16 items-center gap-2 rounded-xl border border-chart-4/30 bg-background p-2.5 shadow-sm transition-transform duration-200 group-hover:translate-y-1">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-chart-4/15">
                    <span className="size-2 rounded-full bg-chart-4" />
                </span>
                <span className="space-y-1.5">
                    <span className="block h-1.5 w-6 rounded-full bg-foreground/20" />
                    <span className="block h-1.5 w-8 rounded-full bg-foreground/10" />
                </span>
            </div>

            <div className="absolute top-1/2 right-[7%] grid size-14 -translate-y-1/2 place-items-center rounded-2xl border border-primary/25 bg-background shadow-sm transition-[transform,box-shadow] duration-200 group-hover:-translate-y-[54%] group-hover:shadow-md">
                <span className="grid size-7 place-items-center rounded-full bg-primary/12">
                    <span className="size-3 rounded-full bg-primary" />
                </span>
            </div>
        </div>
    );
}
