import { cn } from "@/lib/utils";
import type { WorkspaceTemplate } from "@/features/workspace/model/workspace-data";

const accentClasses: Record<WorkspaceTemplate["accent"], string> = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
};

type DiagramPreviewProps = {
    accent: WorkspaceTemplate["accent"];
    density?: "empty" | "simple" | "dense";
};

export function DiagramPreview({ accent, density = "simple" }: DiagramPreviewProps) {
    if (density === "empty") {
        return (
            <div className="relative h-full min-h-36 overflow-hidden bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]">
                <div className="absolute inset-0 bg-linear-to-br from-transparent to-muted/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-lg border bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        Empty canvas
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-36 overflow-hidden bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]">
            <svg className="absolute inset-0 size-full" viewBox="0 0 320 150" fill="none">
                <path
                    d="M70 48H130C146 48 146 75 162 75H210"
                    stroke="currentColor"
                    className="text-border"
                    strokeWidth="2"
                />
                <path
                    d={density === "dense" ? "M162 75V118H235" : "M162 75V116"}
                    stroke="currentColor"
                    className="text-border"
                    strokeWidth="2"
                />
            </svg>
            <div className="absolute top-[24%] left-[9%] h-10 w-16 rounded-lg border bg-background shadow-sm">
                <span
                    className={cn("absolute top-3 left-3 size-3 rounded-sm", accentClasses[accent])}
                />
                <span className="absolute top-3.5 right-3 h-1.5 w-6 rounded-full bg-muted-foreground/25" />
            </div>
            <div className="absolute top-[37%] left-[43%] h-12 w-20 rounded-lg border bg-background shadow-sm">
                <span
                    className={cn("absolute top-3 left-3 size-4 rounded", accentClasses[accent])}
                />
                <span className="absolute top-3 right-3 h-1.5 w-8 rounded-full bg-muted-foreground/25" />
                <span className="absolute top-6 right-3 h-1.5 w-6 rounded-full bg-muted-foreground/15" />
            </div>
            <div className="absolute right-[9%] bottom-[18%] h-10 w-16 rounded-lg border bg-background shadow-sm">
                <span className="absolute top-3 left-3 size-3 rounded-full bg-muted-foreground/30" />
                <span className="absolute top-3.5 right-3 h-1.5 w-6 rounded-full bg-muted-foreground/20" />
            </div>
            {density === "dense" && (
                <div className="absolute bottom-[9%] left-[36%] h-9 w-14 rounded-lg border bg-background shadow-sm">
                    <span className="absolute top-3 left-3 h-1.5 w-8 rounded-full bg-muted-foreground/20" />
                </div>
            )}
        </div>
    );
}
