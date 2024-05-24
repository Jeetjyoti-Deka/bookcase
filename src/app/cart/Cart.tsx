"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBook, CartBook, removeBook } from "@/redux/slice/cartSlice";
import { ImageOff, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModel from "@/components/LoginModel";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);

  const router = useRouter();

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => {
        if (curr.purchaseType === "buy") {
          return acc + curr.price! * curr.quantity!;
        } else {
          return acc + curr.rentalPrice! * curr.rentalDays!;
        }
      }, 0)
    );
  }, [cart]);

  const { mutate: createPaymentSession } = useMutation({
    mutationFn: createCheckoutSession,
    mutationKey: ["create-payment-session"],
    onSuccess: ({ url }) => {
      setIsLoginModelOpen(false);
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrieve payment URL");
      }
    },
  });

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({ cart });
    } else {
      setIsLoginModelOpen(true);
    }
  };

  return (
    <MaxWidthWrapper className="mt-[56px] min-h-[calc(100vh-56px)] py-10">
      <LoginModel
        isOpen={isLoginModelOpen}
        onOpenChange={setIsLoginModelOpen}
      />
      <div className="flex flex-col">
        <div className="grid-cols-5 items-center hidden sm:grid">
          <h3 className="font-normal text-gray-600 text-lg place-self-center col-span-2 ">
            Product
          </h3>
          <h3 className="font-normal text-gray-600 text-lg place-self-center ">
            Quantity
          </h3>
          <h3 className="font-normal text-gray-600 text-lg place-self-center -ml-6 ">
            Price
          </h3>
          <h3 className="font-normal text-gray-600 text-lg place-self-center -ml-28 ">
            Total
          </h3>
        </div>
        {cart.map((book) => (
          <CartRow key={book.volumeId} book={book} />
        ))}
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="bg-gray-200 border-zinc-400 rounded-lg p-6 flex flex-col gap-y-2">
          <div className="flex items-center justify-between w-64">
            <h6 className="text-zinc-700">Subtotal</h6>
            <p>{formatPrice(total)}</p>
          </div>
          <div className="flex items-center justify-between w-64">
            <h6 className="text-zinc-700">Shipping</h6>
            <p>{formatPrice(49)}</p>
          </div>
          <div className="flex items-center justify-between w-64">
            <h6 className="text-zinc-700">Total</h6>
            <p>{formatPrice(total + 49)}</p>
          </div>
          <Button onClick={handleCheckout} className="w-full mt-3">
            Checkout
            <ShoppingCart className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

const CartRow = ({ book }: { book: CartBook }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-[9%,86%,5%] pt-4 sm:p-4 sm:border-b border-zinc-400 items-center hover:bg-gray-200 transition-all">
        <div className="w-16 h-16 relative flex items-center justify-center bg-gray-200">
          {book.bookImage ? (
            <Image
              src={book.bookImage}
              fill
              alt={book.bookTitle}
              className="object-contain w-full"
            />
          ) : (
            <ImageOff className="w-6 h-6" />
          )}
        </div>
        <div className="place-self-center sm:hidden">
          <p>{book.purchaseType.toUpperCase()}</p>
        </div>
        <div className="grid-cols-5 items-center hidden sm:grid">
          <div className="">
            <Link
              href={`/books/${book.volumeId}`}
              className="hover:underline line-clamp-1 transition-all"
            >
              <h3>{book.bookTitle}</h3>
            </Link>
          </div>

          <div className="place-self-center">
            <p>{book.purchaseType.toUpperCase()}</p>
          </div>

          <div className="place-self-center">
            {book.purchaseType === "buy" ? (
              <QuantitySelect
                defaultVal={book.quantity!.toString()}
                book={book}
              />
            ) : (
              <RentalDaysSelect
                defaultVal={book.rentalDays!.toString()}
                book={book}
              />
            )}
          </div>
          <div className="place-self-center">
            {book.purchaseType === "rent" && (
              <p>
                <span className="font-semibold text-zinc-600">
                  {formatPrice(book.rentalPrice!)}
                </span>{" "}
                / day
              </p>
            )}
            {book.purchaseType === "buy" && (
              <span className="font-semibold text-zinc-600">
                {formatPrice(book.price!)}
              </span>
            )}
          </div>

          <div className="place-self-center">
            {book.purchaseType === "rent" && (
              <p>
                <span className="font-semibold text-zinc-600">
                  {formatPrice(book.rentalPrice! * book.rentalDays!)}
                </span>{" "}
              </p>
            )}
            {book.purchaseType === "buy" && (
              <span className="font-semibold text-zinc-600">
                {formatPrice(book.price! * book.quantity!)}
              </span>
            )}
          </div>
        </div>
        <div className="justify-self-end">
          <Button
            variant="destructive"
            onClick={() => dispatch(removeBook(book))}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid-cols-4 items-center grid sm:hidden border-b border-zinc-400 pb-4">
        <div className="">
          <Link
            href={`/books/${book.volumeId}`}
            className="hover:underline line-clamp-1 transition-all"
          >
            <h3>{book.bookTitle}</h3>
          </Link>
        </div>

        <div className="place-self-center hidden">
          <p>{book.purchaseType.toUpperCase()}</p>
        </div>

        <div className="place-self-center">
          {book.purchaseType === "buy" ? (
            <QuantitySelect
              defaultVal={book.quantity!.toString()}
              book={book}
            />
          ) : (
            <RentalDaysSelect
              defaultVal={book.rentalDays!.toString()}
              book={book}
            />
          )}
        </div>
        <div className="place-self-center">
          {book.purchaseType === "rent" && (
            <p>
              <span className="font-semibold text-zinc-600 text-sm">
                {formatPrice(book.rentalPrice!)}
              </span>{" "}
              / day
            </p>
          )}
          {book.purchaseType === "buy" && (
            <span className="font-semibold text-zinc-600 text-sm">
              {formatPrice(book.price!)}
            </span>
          )}
        </div>

        <div className="place-self-center">
          {book.purchaseType === "rent" && (
            <p>
              <span className="font-semibold text-zinc-600 text-sm">
                {formatPrice(book.rentalPrice! * book.rentalDays!)}
              </span>{" "}
            </p>
          )}
          {book.purchaseType === "buy" && (
            <span className="font-semibold text-zinc-600 text-sm">
              {formatPrice(book.price! * book.quantity!)}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const QuantitySelect = ({
  defaultVal,
  book,
}: {
  defaultVal: string;
  book: CartBook;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Select
      //  disabled={purchaseOption === "rent"}
      value={defaultVal}
      onValueChange={(v: "1" | "2" | "3" | "4" | "5") =>
        dispatch(
          addBook({
            ...book,
            quantity: Number(v),
          })
        )
      }
    >
      <SelectTrigger className="w-[60px] xs:w-[110px] lg:w-[180px] focus:ring-green-400">
        <SelectValue placeholder="2" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="3">3</SelectItem>
        <SelectItem value="4">4</SelectItem>
        <SelectItem value="5">5</SelectItem>
      </SelectContent>
    </Select>
  );
};

const RentalDaysSelect = ({
  defaultVal,
  book,
}: {
  defaultVal: string;
  book: CartBook;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Select
      value={defaultVal}
      onValueChange={(v: "2" | "3" | "5") =>
        dispatch(
          addBook({
            ...book,
            rentalDays: Number(v),
          })
        )
      }
    >
      <SelectTrigger className="w-[60px] xs:w-[110px] lg:w-[180px] focus:ring-green-400">
        <SelectValue placeholder="2" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="3">3</SelectItem>
        <SelectItem value="5">5</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Cart;
