import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { TBook } from "./validators";
import { getBooks, getSingleBook } from "./queryFunctions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
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
        : "NA",
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
      volumeId: item.id ?? "",
      genres: null,
      rating: null,
    });
  });

  return books;
};

export const processApiResultSingleBook = (
  data: Awaited<ReturnType<typeof getSingleBook>>
) => {
  let book: z.infer<typeof TBook>;

  book = {
    bookAuthor:
      data.data.volumeInfo.authors?.length > 1
        ? (data.data.volumeInfo.authors.join(" and ") as string)
        : data.data.volumeInfo.authors
        ? data.data.volumeInfo.authors[0]
        : "NA",
    bookTitle: data.data.volumeInfo.title
      ? (data.data.volumeInfo.title as string)
      : "NA",
    bookDescription: data.data.volumeInfo.description
      ? (data.data.volumeInfo.description as string)
      : null,
    bookPublisher: data.data.volumeInfo.publisher
      ? (data.data.volumeInfo.publisher as string)
      : null,
    pageCount: data.data.volumeInfo.pageCount
      ? (data.data.volumeInfo.pageCount as number)
      : null,
    bookImage: data.data.volumeInfo.imageLinks?.small
      ? (data.data.volumeInfo.imageLinks?.small as string)
      : data.data.volumeInfo.imageLinks?.thumbnail
      ? data.data.volumeInfo.imageLinks?.thumbnail
      : null,
    volumeId: data.data.id ?? "",
    genres: data.data.volumeInfo.categories
      ?.join(" / ")
      .split(" / ")
      .filter(
        (item: string, index: number, arr: string[]) =>
          arr.indexOf(item) === index
      ),
    rating: data.data.volumeInfo.averageRating,
    width: data.data.volumeInfo.dimensions?.width,
    height: data.data.volumeInfo.dimensions?.height,
    price: data.data.saleInfo?.retailPrice?.amount ?? 450.0,
  };

  return book;
};

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });

  return formatter.format(date);
};
