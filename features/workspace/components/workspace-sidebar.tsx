import Image from "next/image";
import Link from "next/link";
import { Blocks, FolderKanban, LayoutTemplate, Settings2, Trash2 } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const navigation = [
    { label: "Home", href: "/", icon: Blocks, active: true },
    { label: "All diagrams", href: "#diagrams", icon: FolderKanban, active: false },
    { label: "Templates", href: "#templates", icon: LayoutTemplate, active: false },
    { label: "Trash", href: "#trash", icon: Trash2, active: false },
] as const;

export function WorkspaceSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-16 justify-center border-b px-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<Link href="/" />} tooltip="Arko">
                            <Image src="/icon.svg" alt="" width={28} height={28} priority />
                            <span className="text-base font-semibold tracking-tight">Arko</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu aria-label="Workspace navigation">
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        render={<Link href={item.href} />}
                                        isActive={item.active}
                                        tooltip={item.label}
                                    >
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings2 />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
