export default function EditorLoading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
                Opening diagram…
            </div>
        </main>
    );
}
