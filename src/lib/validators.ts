import { z } from "zod";

export const TBook = z.object({
  bookAuthor: z.string(),
  bookTitle: z.string().nullable(),
  bookImage: z.string().nullable(),
  bookDescription: z.string().nullable(),
  bookIsbn: z.string().optional(),
  bookPublisher: z.string().nullable(),
  pageCount: z.number().nullable(),
});
