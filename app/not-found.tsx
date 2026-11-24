export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-center">
            <div className="flex max-w-lg flex-col items-center">
                <p className="font-mono text-7xl font-medium tracking-[0.08em] text-foreground sm:text-8xl">
                    404
                </p>
                <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Not Found
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                    The page you are looking for does not exist.
                </p>
            </div>
        </main>
    );
}
