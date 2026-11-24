import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

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
        <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
            <body>
                <TooltipProvider>{children}</TooltipProvider>
            </body>
        </html>
    );
}
