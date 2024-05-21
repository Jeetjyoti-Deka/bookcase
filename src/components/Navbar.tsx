"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white/60 fixed z-50 left-0 top-0 inset-x-0 h-14 flex items-center justify-between px-16 border-b border-gray-200 shadow-lg backdrop-blur-xl transition-all">
      <Link href="/" className="font-semibold text-lg cursor-pointer">
        Book<span className="text-primary">Case</span>
      </Link>
      <div className="flex items-center gap-x-10">
        <Link href="/api/auth/login">Sign In</Link>
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
      </div>
    </nav>
  );
};
export default Navbar;
