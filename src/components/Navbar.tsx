import Link from "next/link";
import NavbarButton from "./NavbarButton";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Home,
  LibraryBig,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileNavItem from "./MobileNavItem";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-white/60 fixed z-50 left-0 top-0 inset-x-0 h-14 flex items-center justify-between px-6 xs:px-16 border-b border-gray-200 shadow-lg backdrop-blur-xl transition-all">
      <Link href="/" className="font-semibold text-lg cursor-pointer">
        Book<span className="text-primary">Case</span>
      </Link>
      <div className="hidden sm:flex items-center gap-x-10">
        <Link href="/books">Home</Link>

        {user ? (
          <ProfileDropdown />
        ) : (
          <LoginLink postLoginRedirectURL="/books">Login</LoginLink>
        )}
        <NavbarButton size="sm" />
      </div>
      <div className="block sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>BookCase</SheetTitle>
            </SheetHeader>
            <div className="w-full h-full pb-4 relative flex flex-col items-center justify-between">
              <div className="w-full flex flex-col justify-center items-center gap-y-4 mt-3">
                <MobileNavItem href="/books">
                  <Home className="w-5 h-5" /> Home
                </MobileNavItem>

                {user && (
                  <MobileNavItem href={`/my-orders/${user?.id}`}>
                    <LibraryBig className="w-5 h-5" /> My Orders
                  </MobileNavItem>
                )}
                <MobileNavItem href="/cart">
                  <ShoppingCart className="w-5 h-5" /> Cart
                </MobileNavItem>
              </div>
              {user ? (
                <LogoutLink className="w-full">
                  <Button className="w-full">Sign Out</Button>
                </LogoutLink>
              ) : (
                <LoginLink className="w-full">
                  <Button className="w-full">Sign In</Button>
                </LoginLink>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

const ProfileDropdown = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        Profile <ChevronDown className="ml-1.5 h-4 w-4 -mb-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/my-orders/${user?.id}`}>My Orders</Link>
        </DropdownMenuItem>
        <Button className="w-full mt-2" variant="default" asChild>
          <LogoutLink postLogoutRedirectURL="/books">Sign Out</LogoutLink>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
