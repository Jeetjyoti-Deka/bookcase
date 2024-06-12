"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "./ui/sheet";

const MobileNavItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "w-full py-2 px-3 flex items-center justify-start gap-x-2 rounded-lg border border-neutral-500 text-muted-foreground",
          pathname === href && "bg-primary/20 text-primary border-primary/90"
        )}
      >
        {children}
      </Link>
    </SheetClose>
  );
};
export default MobileNavItem;
