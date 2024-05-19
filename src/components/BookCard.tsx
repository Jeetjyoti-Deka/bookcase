import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { TBook } from "@/lib/validators";
import { ImageOff, Plus } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { Button } from "./ui/button";

const BookCard = ({ book }: { book: z.infer<typeof TBook> }) => {
  return (
    <Card className="w-64 overflow-hidden">
      <CardHeader className="p-0 pb-2">
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
      </CardHeader>
      <CardContent>
        <p className="truncate">{book.bookTitle}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>{formatPrice(1)} / day</p>
        <Button>
          Add <Plus className="w-4 h-4 ml-1.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
export default BookCard;
