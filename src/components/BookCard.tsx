import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { TBook } from "@/lib/validators";
import Image from "next/image";
import { z } from "zod";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const BookCard = ({ book }: { book: z.infer<typeof TBook> }) => {
  return (
    <Card className="w-64 overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <div className="w-full h-44 relative p-0">
          <Image
            src={book.bookImage ?? "/books/book-3.png"}
            fill
            alt={book.bookTitle}
            className="object-cover w-full"
          />
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
