"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    BlocksIcon,
    FolderKanbanIcon,
    GalleryVerticalEndIcon,
    LayoutTemplateIcon,
    NetworkIcon,
    Settings2Icon,
    WorkflowIcon,
} from "lucide-react";

const data = {
    user: {
        name: "Arko",
        email: "Workspace",
        avatar: "",
    },
    teams: [
        {
            name: "Arko",
            logo: GalleryVerticalEndIcon,
            plan: "Workspace",
        },
    ],
    navMain: [
        {
            title: "Workspace",
            url: "/",
            icon: BlocksIcon,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/",
                },
                {
                    title: "Recent diagrams",
                    url: "#diagrams",
                },
            ],
        },
        {
            title: "Library",
            url: "#templates",
            icon: LayoutTemplateIcon,
            items: [
                {
                    title: "Templates",
                    url: "#templates",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2Icon,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Appearance",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Software architecture",
            url: "#templates",
            icon: NetworkIcon,
        },
        {
            name: "System design",
            url: "#templates",
            icon: FolderKanbanIcon,
        },
        {
            name: "Workflows",
            url: "#templates",
            icon: WorkflowIcon,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
