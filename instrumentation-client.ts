function normalizeError(value: unknown) {
    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
        };
    }

    return {
        name: "UnknownError",
        message: String(value),
    };
}

function reportClientError(event: Record<string, unknown>) {
    try {
        console.error(JSON.stringify(event));
    } catch {
        console.error("Unable to serialize client monitoring event");
    }
}

window.addEventListener("error", (event) => {
    reportClientError({
        level: "error",
        event: "client_error",
        ...normalizeError(event.error),
        timestamp: new Date().toISOString(),
    });
});

window.addEventListener("unhandledrejection", (event) => {
    reportClientError({
        level: "error",
        event: "unhandled_rejection",
        ...normalizeError(event.reason),
        timestamp: new Date().toISOString(),
    });
});
