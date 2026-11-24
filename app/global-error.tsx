"use client";

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
                    <button
                        type="button"
                        onClick={() => retry()}
                        className="bg-primary text-primary-foreground mt-6 rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Try again
                    </button>
                </main>
            </body>
        </html>
    );
}
