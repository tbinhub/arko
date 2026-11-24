"use client";

import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import { memo } from "react";
import type { ArchitectureEdge } from "@/features/diagram/model/types";

export const ArchitectureEdgeComponent = memo(function ArchitectureEdgeComponent({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    selected,
    data,
}: EdgeProps<ArchitectureEdge>) {
    const [path, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 16,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                markerEnd={markerEnd}
                className={data?.animated ? "arko-edge-flow" : undefined}
                style={{
                    strokeWidth: selected ? 2.25 : 1.5,
                    stroke: selected ? "var(--primary)" : undefined,
                }}
            />
            {(data?.label || data?.protocol) && (
                <EdgeLabelRenderer>
                    <div
                        className="nodrag nopan pointer-events-none absolute rounded-md border bg-background/95 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-xs backdrop-blur"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        }}
                    >
                        {data.label || data.protocol}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
});
