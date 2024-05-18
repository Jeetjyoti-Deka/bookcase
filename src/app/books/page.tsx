"use client";

import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/queryFunctions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TBook } from "@/lib/validators";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { GENRES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { getPaginatedBooks } from "@/lib/utils";

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [books, setBooks] = useState<z.infer<typeof TBook>[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-books"],
    queryFn: getBooks,
  });

  useEffect(() => {
    const curBooks = getPaginatedBooks(data?.data, pageNumber);
    setBooks(curBooks.books);
    setTotalPages(curBooks.totalPages);
  }, [pageNumber, data?.data]);

  return (
    <div className="mt-[56px] min-h-[calc(100vh-56px)] px-2">
      <div className="grid grid-cols-12 gap-x-2 pt-2 pb-6">
        <div className="border-2 border-zinc-300 rounded-lg p-3 col-span-2 min-h-[calc(100vh-56px)]">
          <GenreSection />
        </div>
        <div className="col-span-10 ">
          <div className="flex items-center justify-center flex-wrap gap-x-9 gap-y-4 min-h-[611.2px]">
            {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}

            {books?.map((book: z.infer<typeof TBook>, index: number) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem className="cursor-pointer select-none">
                  <Button
                    variant="ghost"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1.5" /> Previous
                  </Button>
                </PaginationItem>
                <PaginationItem className="cursor-pointer select-none">
                  <Button
                    variant="ghost"
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4 mr-1.5" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenreSection = () => {
  return (
    <>
      <h3 className="font-semibold text-lg text-zinc-800 ml-2">Genre</h3>
      <div className="flex items-center gap-x-2 gap-y-3 flex-wrap mt-3">
        {GENRES.map((genre, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-gray-200 transition-all"
          >
            {genre}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default Page;
