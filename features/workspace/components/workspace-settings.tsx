"use client";

import { Monitor, Moon, Settings2, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const;

export function WorkspaceSettings() {
    const { theme, setTheme } = useTheme();

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" size="lg" className="h-10 px-5" />}>
                <Settings2 />
                Settings
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader className="border-b p-5 pr-12">
                    <SheetTitle>Workflow settings</SheetTitle>
                    <SheetDescription>Adjust how Arko looks while you work.</SheetDescription>
                </SheetHeader>

                <div className="p-5">
                    <div>
                        <h3 className="text-sm font-medium text-foreground">Appearance</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Choose a theme for the workspace and editor.
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {themeOptions.map((option) => {
                            const Icon = option.icon;

                            return (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={theme === option.value ? "default" : "outline"}
                                    className="h-auto flex-col gap-2 py-3"
                                    aria-pressed={theme === option.value}
                                    onClick={() => setTheme(option.value)}
                                >
                                    <Icon className="size-4" />
                                    {option.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
