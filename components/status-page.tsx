import type { ReactNode } from "react";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";

type StatusPageProps = {
    code: string;
    title: string;
    description: string;
    action: ReactNode;
};

export function StatusPage({ code, title, description, action }: StatusPageProps) {
    return (
        <main className="flex min-h-svh items-center justify-center bg-background px-6 py-16 text-foreground">
            <Empty className="max-w-md gap-6 border-0 p-0">
                <EmptyHeader className="max-w-md gap-3">
                    <p className="font-mono text-6xl font-medium tracking-[0.08em] sm:text-7xl">
                        {code}
                    </p>
                    <EmptyTitle className="text-xl font-semibold sm:text-2xl">
                        <h1>{title}</h1>
                    </EmptyTitle>
                    <EmptyDescription className="max-w-sm">{description}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="w-auto">{action}</EmptyContent>
            </Empty>
        </main>
    );
}
