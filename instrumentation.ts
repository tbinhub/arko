import type { Instrumentation } from "next";

function normalizeError(error: unknown) {
    if (error instanceof Error) {
        return {
            message: error.message,
            digest:
                "digest" in error && typeof error.digest === "string" ? error.digest : undefined,
        };
    }

    return {
        message: String(error),
        digest: undefined,
    };
}

export function register() {
    console.info(
        JSON.stringify({
            level: "info",
            event: "application_started",
            runtime: process.env.NEXT_RUNTIME ?? "nodejs",
            timestamp: new Date().toISOString(),
        }),
    );
}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
    console.error(
        JSON.stringify({
            level: "error",
            event: "request_error",
            ...normalizeError(error),
            method: request.method,
            path: request.path.split("?", 1)[0],
            routePath: context.routePath,
            routeType: context.routeType,
            timestamp: new Date().toISOString(),
        }),
    );
};
