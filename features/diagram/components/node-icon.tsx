import type { LucideProps } from "lucide-react";
import {
    Box,
    Cloud,
    Database,
    ListTree,
    MemoryStick,
    MonitorSmartphone,
    Waypoints,
} from "lucide-react";

const icons = {
    box: Box,
    cloud: Cloud,
    database: Database,
    "list-tree": ListTree,
    "memory-stick": MemoryStick,
    "monitor-smartphone": MonitorSmartphone,
    waypoints: Waypoints,
};

export function NodeIcon({ name, ...props }: { name: string } & LucideProps) {
    const Icon = icons[name as keyof typeof icons] ?? Box;
    return <Icon {...props} />;
}
