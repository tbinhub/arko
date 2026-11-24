"use client";

import Image from "next/image";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { BlocksIcon, LayoutTemplateIcon, Settings2Icon } from "lucide-react";

function ArkoLogo({ className }: { className?: string }) {
    return <Image src="/icon.svg" alt="" width={24} height={24} className={className} />;
}

const data = {
    user: {
        name: "Arko",
        email: "Workspace",
        avatar: "",
    },
    teams: [
        {
            name: "Arko",
            logo: ArkoLogo,
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
            ],
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
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
