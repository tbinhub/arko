import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    APP_URL: z.string().url(),
});

const result = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
});

if (!result.success) {
    throw new Error(`Invalid environment variables: ${z.prettifyError(result.error)}`);
}

export const env = Object.freeze(result.data);
