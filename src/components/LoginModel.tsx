import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "./ui/button";

const LoginModel = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="absolute z-[99999]">
        <DialogHeader>
          <div className="relative mx-auto w-52 h-24 mb-8">
            <Image
              src="/books/book-1.svg"
              alt="book"
              className="object-contain w-full"
              width={300}
              height={300}
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
            Login to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>{" "}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 ">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
            })}
            postLoginRedirectURL="/cart"
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "default",
            })}
          >
            Sign Up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginModel;
