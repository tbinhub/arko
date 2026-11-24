import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function EditorLoading() {
    return (
        <main className="flex h-dvh flex-col overflow-hidden bg-background">
            <header className="flex h-14 shrink-0 items-center justify-between border-b px-3">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-5 w-36" />
                </div>
                <Spinner className="text-muted-foreground" />
            </header>
            <div className="flex min-h-0 flex-1">
                <aside className="hidden w-64 border-r p-4 md:block">
                    <Skeleton className="h-8 w-full" />
                    <div className="mt-5 space-y-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-10 w-full" />
                        ))}
                    </div>
                </aside>
                <div className="relative flex-1 bg-muted/20">
                    <Skeleton className="absolute top-1/3 left-1/4 h-16 w-52 rounded-xl" />
                    <Skeleton className="absolute top-1/2 left-1/2 h-16 w-52 rounded-xl" />
                </div>
            </div>
        </main>
    );
}
