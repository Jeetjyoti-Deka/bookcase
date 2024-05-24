import Link from "next/link";
import NavbarButton from "./NavbarButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-white/60 fixed z-50 left-0 top-0 inset-x-0 h-14 flex items-center justify-between px-16 border-b border-gray-200 shadow-lg backdrop-blur-xl transition-all">
      <Link href="/" className="font-semibold text-lg cursor-pointer">
        Book<span className="text-primary">Case</span>
      </Link>
      <div className="flex items-center gap-x-10">
        {user ? (
          <Link href="/api/auth/logout">Sign Out</Link>
        ) : (
          <Link href="/api/auth/login">Sign In</Link>
        )}
        <NavbarButton />
      </div>
    </nav>
  );
};
export default Navbar;
