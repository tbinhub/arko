"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
    return (
        <html lang="en">
            <body className="bg-background text-foreground flex min-h-screen items-center justify-center p-6">
                <main className="mx-auto flex max-w-md flex-col items-center text-center">
                    <p className="text-primary text-sm font-semibold">Something went wrong</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        Arko couldn&apos;t load this page
                    </h1>
                    <p className="text-muted-foreground mt-3 text-sm leading-6">
                        If the problem persists, refresh the page in a few minutes.
                    </p>
                    <Button type="button" onClick={() => retry()} className="mt-6">
                        Try again
                    </Button>
                </main>
            </body>
        </html>
    );
}
