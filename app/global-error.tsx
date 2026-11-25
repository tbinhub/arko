"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPage } from "@/components/status-page";
import { cn } from "@/lib/utils";
import { geistMono, geistSans } from "./fonts";

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
    return (
        <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
            <body>
                <StatusPage
                    code="500"
                    title="Something went wrong"
                    description="Arko could not load this page. Try again, or return in a few minutes."
                    action={
                        <Button type="button" onClick={() => retry()}>
                            <RotateCcw />
                            Try again
                        </Button>
                    }
                />
            </body>
        </html>
    );
}
