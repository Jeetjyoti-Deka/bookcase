"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

const NavbarButton = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <Link href="/books" className={buttonVariants()}>
          Rent Now
          <ArrowRight className="h-5 w-5 ml-1.5" />
        </Link>
      ) : (
        <Link
          href="/cart"
          className={buttonVariants({
            className: "rounded-full",
          })}
        >
          <ShoppingCart className="w-6 h-6" />
        </Link>
      )}
    </>
  );
};
export default NavbarButton;
