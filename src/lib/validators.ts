import { z } from "zod";

export const TBook = z.object({
  bookAuthor: z.string(),
  bookTitle: z.string(),
  bookImage: z.string().nullable(),
  bookDescription: z.string(),
  bookIsbn: z.string(),
  bookPublisher: z.string(),
});
