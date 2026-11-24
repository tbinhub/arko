import type { Metadata } from "next";
import { WorkspaceHome } from "@/features/workspace/components/workspace-home";

export const metadata: Metadata = {
    title: { absolute: "Workspace | Arko" },
};

export default function Home() {
    return <WorkspaceHome />;
}
