import Link from "next/link";
import { Blocks, FolderKanban, LayoutTemplate, Settings2, Sparkles, Trash2 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

const navigation = [
    { label: "Home", href: "/", icon: Blocks, active: true },
    { label: "All diagrams", href: "#diagrams", icon: FolderKanban, active: false },
    { label: "Templates", href: "#templates", icon: LayoutTemplate, active: false },
    { label: "Trash", href: "#trash", icon: Trash2, active: false },
] as const;

export function WorkspaceSidebar() {
    return (
        <aside className="hidden w-60 shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
            <div className="flex h-16 items-center px-5">
                <BrandMark />
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Workspace navigation">
                {navigation.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                    >
                        <item.icon className="size-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="space-y-2 border-t p-3">
                <div className="rounded-xl border bg-background p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Sparkles className="size-4 text-primary" />
                        Arko local
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                        Your diagrams stay in this browser for now.
                    </p>
                </div>
                <button
                    type="button"
                    className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                >
                    <Settings2 className="size-4" />
                    Settings
                </button>
            </div>
        </aside>
    );
}
