import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { geistMono, geistSans } from "./fonts";

export const metadata: Metadata = {
    metadataBase: new URL(env.APP_URL),
    title: {
        default: "Arko",
        template: "%s | Arko",
    },
    description: "Create workflows, software architecture, and system diagrams visually.",
    applicationName: "Arko",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Arko",
        title: "Arko",
        description: "Create workflows, software architecture, and system diagrams visually.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Arko",
        description: "Create workflows, software architecture, and system diagrams visually.",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(geistSans.variable, geistMono.variable)}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <TooltipProvider>{children}</TooltipProvider>
                    <Toaster position="bottom-right" />
                </ThemeProvider>
            </body>
        </html>
    );
}
