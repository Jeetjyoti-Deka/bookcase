import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { TBook } from "@/lib/validators";
import { Check, ImageOff, Plus } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBook } from "@/redux/slice/cartSlice";
import { useMemo } from "react";

const BookCard = ({ book }: { book: z.infer<typeof TBook> }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const isInCart = useMemo(() => {
    return cart.find((item) => item.volumeId === book.volumeId);
  }, [cart, book]);

  return (
    <Card className="w-64 overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <Link href={`/books/${book.volumeId}`}>
          <div className="w-full h-44 relative p-0 flex items-center justify-center bg-gray-200">
            {book.bookImage ? (
              <Image
                src={book.bookImage}
                fill
                alt={book.bookTitle ?? ""}
                className="object-contain w-full"
              />
            ) : (
              <ImageOff className="h-10 w-10" />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`/books/${book.volumeId}`}>
          <p className="truncate hover:underline underline-offset-1">
            {book.bookTitle}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>{formatPrice(1)} / day</p>
        <Button
          className={cn(
            "transition-all",
            isInCart && "bg-green-500 hover:bg-green-500"
          )}
          onClick={() => {
            dispatch(
              addBook({
                bookImage: book.bookImage,
                bookTitle: book.bookTitle,
                price: null,
                purchaseType: "rent",
                quantity: 1,
                rentalDays: 2,
                rentalPrice: 65,
                volumeId: book.volumeId,
              })
            );
          }}
        >
          {isInCart ? (
            <>
              Added <Check className="w-4 h-4 ml-1.5" />
            </>
          ) : (
            <>
              Add <Plus className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default BookCard;
