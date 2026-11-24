import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
    className?: string;
    compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
    return (
        <Link
            href="/"
            aria-label="Arko home"
            className={cn(
                "flex w-fit items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                className,
            )}
        >
            <Image src="/icon.svg" alt="" width={28} height={28} priority />
            {!compact && <span className="text-base font-semibold tracking-tight">Arko</span>}
        </Link>
    );
}
