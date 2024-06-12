"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NavbarButton = ({ size }: { size: "sm" | "lg" }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <Link
          href="/books"
          className={buttonVariants({
            className: cn(size === "lg" && "w-full"),
          })}
        >
          Rent Now
          <ArrowRight className="h-5 w-5 ml-1.5" />
        </Link>
      ) : (
        <Link
          href="/cart"
          className={buttonVariants({
            className: cn(
              "rounded-full",
              size === "lg" && "w-full flex items-center justify-start gap-x-2"
            ),
          })}
        >
          <ShoppingCart className="w-6 h-6" />
          {size === "lg" && "Cart"}
        </Link>
      )}
    </>
  );
};
export default NavbarButton;
