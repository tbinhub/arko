import Link from "next/link";
import { House } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { StatusPage } from "@/components/status-page";

export default function NotFound() {
    return (
        <StatusPage
            code="404"
            title="Page not found"
            description="The page you are looking for does not exist or may have been moved."
            action={
                <Link href="/" className={buttonVariants()}>
                    <House />
                    Back to home
                </Link>
            }
        />
    );
}
