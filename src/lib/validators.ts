import { z } from "zod";

export const TBook = z.object({
  bookAuthor: z.string(),
  bookTitle: z.string(),
  bookImage: z.string().nullable(),
  bookDescription: z.string().nullable(),
  bookIsbn: z.string().optional(),
  bookPublisher: z.string().nullable(),
  pageCount: z.number().nullable(),
  volumeId: z.string(),
  genres: z.array(z.string()).nullable(),
  rating: z.number().nullable(),
  width: z.string().optional(),
  height: z.string().optional(),
  price: z.number().optional(),
});
