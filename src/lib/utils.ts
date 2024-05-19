import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { TBook } from "./validators";
import { getBooks } from "./queryFunctions";

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

export const processApiResult = (
  data: Awaited<ReturnType<typeof getBooks>>
) => {
  const books: z.infer<typeof TBook>[] = [];

  data.data.items.forEach((item: any) => {
    books.push({
      bookAuthor:
        item.volumeInfo.authors?.length > 1
          ? (item.volumeInfo.authors.join(" and ") as string)
          : item.volumeInfo.authors
          ? item.volumeInfo.authors[0]
          : "NA",
      bookTitle: item.volumeInfo.title
        ? (item.volumeInfo.title as string)
        : null,
      bookDescription: item.volumeInfo.description
        ? (item.volumeInfo.description as string)
        : null,
      bookPublisher: item.volumeInfo.publisher
        ? (item.volumeInfo.publisher as string)
        : null,
      pageCount: item.volumeInfo.pageCount
        ? (item.volumeInfo.pageCount as number)
        : null,
      bookImage: item.volumeInfo.imageLinks?.thumbnail
        ? (item.volumeInfo.imageLinks?.thumbnail as string)
        : null,
    });
  });

  return books;
};
