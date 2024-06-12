"use client";

import BookCard from "@/components/BookCard";
import { getBooks, search } from "@/lib/queryFunctions";
import { TBook } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { GENRES } from "@/lib/constants";
import { cn, processApiResult } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

const Page = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [books, setBooks] = useState<z.infer<typeof TBook>[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [genre, setGenre] = useState<(typeof GENRES)[number] | null>(GENRES[0]);
  const [searchTerm, setSearchTerm] = useState<string | null>("");

  const { mutate: getGenreBooks, isPending: genrePending } = useMutation({
    mutationKey: ["get-books"],
    mutationFn: getBooks,
    onSuccess: (data) => {
      const curBooks = processApiResult(data);
      setBooks(curBooks);
      setTotalPages(data.data.totalItems);
    },
    onMutate: () => {
      setBooks([]);
    },
  });

  const { mutate: getSearchBooks, isPending: searchPending } = useMutation({
    mutationKey: ["search"],
    mutationFn: search,
    onSuccess: (data) => {
      const curBooks = processApiResult(data);
      setBooks(curBooks);
      setTotalPages(data.data.totalItems);
    },
    onMutate: () => {
      setBooks([]);
    },
  });

  useEffect(() => {
    setPageNumber(0);
  }, [genre, searchTerm]);

  useEffect(() => {
    if (genre) {
      getGenreBooks({ genre, page: pageNumber });
    }
    if (searchTerm) {
      getSearchBooks({ searchTerm, startIndex: String(pageNumber) });
    }
  }, [genre, getGenreBooks, pageNumber, getSearchBooks, searchTerm]);

  return (
    <div className="mt-[56px] min-h-[calc(100vh-56px)] px-2">
      <div className="grid grid-cols-12 gap-x-2 pt-2 pb-6">
        <div className="border-2 border-zinc-300 rounded-lg p-3 col-span-2 min-h-[calc(100vh-56px)] hidden lg:block">
          <GenreSection
            setSearchTerm={setSearchTerm}
            curGenre={genre}
            setGenre={setGenre}
          />
        </div>
        <div className="col-span-12 lg:col-span-10">
          <div className="relative w-fit mx-auto mb-8 xs:mb-0">
            <SearchBar
              setGenre={setGenre}
              isPending={searchPending}
              setSearchTerm={setSearchTerm}
            />
            <div className="absolute top-20 max-xs:left-1/2 max-xs:-translate-x-1/2 xs:top-6 xs:-right-20 block lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Genre</Button>
                </DialogTrigger>
                <DialogContent>
                  <GenreSection
                    curGenre={genre}
                    setGenre={setGenre}
                    setSearchTerm={setSearchTerm}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-x-9 gap-y-4 min-h-[611.2px]">
            {genrePending || searchPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : null}

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
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber((prev) => prev - 8)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1.5" /> Previous
                  </Button>
                </PaginationItem>
                <PaginationItem className="cursor-pointer select-none">
                  <Button
                    variant="ghost"
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber((prev) => prev + 8)}
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

const GenreSection = ({
  setGenre,
  curGenre,
  setSearchTerm,
}: {
  curGenre: string | null;
  setGenre: Dispatch<SetStateAction<string | null>>;
  setSearchTerm: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <>
      <h3 className="font-semibold text-lg text-zinc-800 ml-2">Genre</h3>
      <div className="flex items-center gap-x-2 gap-y-3 flex-wrap mt-3">
        {GENRES.map((genre, index) => (
          <Badge
            key={index}
            variant="outline"
            className={cn("cursor-pointer hover:bg-gray-200 transition-all", {
              "bg-orange-200 text-zinc-800 border border-orange-500 hover:bg-orange-200":
                genre === curGenre,
            })}
            onClick={() => {
              setGenre(genre);
              setSearchTerm(null);
            }}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default Page;
