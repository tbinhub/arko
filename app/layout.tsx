import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geistSans = Geist({
    subsets: ["latin", "vietnamese"],
    variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin", "vietnamese"],
    variable: "--font-geist-mono",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="vi" className={cn(geistSans.variable, geistMono.variable)}>
            <body>{children}</body>
        </html>
    );
}
