"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { memo } from "react";
import { cn } from "cn";
import type { ArchitectureNode } from "@/features/diagram/model/types";
import { NodeIcon } from "./node-icon";

const accentStyles = {
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

export const ArchitectureNodeComponent = memo(function ArchitectureNodeComponent({
    data,
    selected,
}: NodeProps<ArchitectureNode>) {
    return (
        <div
            className={cn(
                "group min-w-52 rounded-xl border bg-card p-3 shadow-sm transition-[border-color,box-shadow]",
                selected &&
                    "border-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_16%,transparent)]",
            )}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!size-2.5 !border-2 !border-background !bg-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="flex items-start gap-3">
                <span
                    className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        accentStyles[data.accent],
                    )}
                >
                    <NodeIcon name={data.icon} className="size-4.5" strokeWidth={1.9} />
                </span>
                <div className="min-w-0 pt-0.5">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                        {data.label}
                    </p>
                    <p className="mt-0.5 max-w-40 truncate text-xs text-muted-foreground">
                        {data.description}
                    </p>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!size-2.5 !border-2 !border-background !bg-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
        </div>
    );
});
