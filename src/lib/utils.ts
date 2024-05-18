import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { TBook } from "./validators";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const getPaginatedBooks = (
  books: z.infer<typeof TBook>[] | undefined,
  page: number
) => {
  if (books === undefined) {
    return {
      books: [],
      totalPages: 0,
    };
  }

  const limit = 8;
  const start = (page - 1) * limit;
  const end = page * limit;

  return {
    books: books.slice(start, end),
    totalPages: Math.ceil(books.length / limit),
  };
};
