"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { getBooks, getSingleBook } from "@/lib/queryFunctions";
import {
  cn,
  formatPrice,
  processApiResult,
  processApiResultSingleBook,
} from "@/lib/utils";
import { TBook } from "@/lib/validators";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ImageOff, Loader2, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "@/components/BookCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBook } from "@/redux/slice/cartSlice";
import Link from "next/link";

const BookPage = ({ id }: { id: string }) => {
  const [book, setBook] = useState<z.infer<typeof TBook> | null>(null);

  const { isSuccess, data, isLoading, isError } = useQuery({
    queryKey: ["get-book"],
    queryFn: () => getSingleBook(id),
  });

  useEffect(() => {
    if (isSuccess) {
      const curBook = processApiResultSingleBook(data);
      setBook(curBook);
    }
  }, [data, isSuccess]);

  return (
    <MaxWidthWrapper className="mt-[56px] min-h-[calc(100vh-56px)] py-10">
      {isLoading ? (
        <div className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : isError ? (
        <div>Something went wrong. Please try again later.</div>
      ) : (
        <>{book && <BookSection book={book} />}</>
      )}
    </MaxWidthWrapper>
  );
};

const BookSection = ({ book }: { book: z.infer<typeof TBook> }) => {
  const [activeSection, setActiveSection] = useState<
    "description" | "genre" | "additional"
  >("description");

  const [purchaseOption, setPurchaseOption] = useState<"rent" | "buy">("rent");
  const [rentalDays, setRentalDays] = useState<"2" | "3" | "5">("2");
  const [quantity, setQuantity] = useState<"1" | "2" | "3" | "4" | "5">("1");

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addBook({
        bookImage: book.bookImage ?? null,
        bookTitle: book.bookTitle,
        purchaseType: purchaseOption,
        volumeId: book.volumeId,
        quantity: purchaseOption === "buy" ? Number(quantity) : null,
        rentalDays: purchaseOption === "rent" ? Number(rentalDays) : null,
        price: purchaseOption === "buy" ? book.price ?? 250.0 : null,
        rentalPrice: purchaseOption === "rent" ? 65.0 : null,
      })
    );
  };

  return (
    <div>
      <Link
        href="/books"
        className={buttonVariants({
          variant: "ghost",
          className: "mb-4",
        })}
      >
        <ChevronLeft className="w-4 h-4 mr-1.5" />
        Back
      </Link>
      <div className="flex flex-col items-center min-[662px]:flex-row min-[662px]:items-start justify-start gap-x-10 mb-10">
        <div className="w-72 h-64 overflow-hidden rounded-lg bg-gray-200 relative flex items-center justify-center">
          {book.bookImage ? (
            <Image
              src={book.bookImage}
              fill
              alt={book.bookTitle ?? "image"}
              className="object-contain w-full"
            />
          ) : (
            <ImageOff className="h-10 w-10" />
          )}
        </div>
        <div className="flex flex-col gap-y-6 mt-4">
          <h3 className="font-semibold text-3xl">{book.bookTitle}</h3>
          <Rating rating={book.rating ?? 4.2} />
          <div>
            <div className="flex items-center gap-x-8">
              <h6
                className="font-medium xs:text-lg cursor-default select-none"
                onClick={() => setActiveSection("description")}
              >
                Description
              </h6>
              <h6
                className="font-medium xs:text-lg cursor-default select-none"
                onClick={() => setActiveSection("genre")}
              >
                Genre
              </h6>
              <h6
                className="font-medium xs:text-lg cursor-default select-none"
                onClick={() => setActiveSection("additional")}
              >
                Additional Info
              </h6>
            </div>
            <div className="w-full h-px bg-gray-200 relative">
              <div
                className={cn(
                  "absolute top-0 w-[105px] h-px bg-zinc-700 transition-all",
                  {
                    "left-0": activeSection === "description",
                    "left-[120px] w-[73px]": activeSection === "genre",
                    "left-[200px] w-[140px]": activeSection === "additional",
                  }
                )}
              />
            </div>
          </div>
          <div className="relative -mt-4">
            {activeSection === "description" ? (
              <>
                <p
                  className="max-w-prose line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: book.bookDescription ?? "",
                  }}
                />
                {book.bookDescription && (
                  <DescriptionDialog description={book.bookDescription ?? ""} />
                )}
              </>
            ) : activeSection === "genre" ? (
              <GenreSection genres={book.genres ?? []} />
            ) : (
              <AdditionalInfoSection
                author={book.bookAuthor}
                pageCount={book.pageCount ?? 0}
                width={book.width ?? "NA"}
                height={book.height ?? "NA"}
              />
            )}
          </div>
        </div>
      </div>
      <RadioGroup
        value={purchaseOption}
        onValueChange={(v: "buy" | "rent") => setPurchaseOption(v)}
      >
        <div className=" flex flex-col items-center gap-y-6 min-[662px]:flex-row min-[662px]:items-start justify-start">
          <div
            className={cn(
              "flex-1 max-[662px]:w-full max-[662px]:max-w-[365px] flex flex-col gap-y-3 h-64 rounded-lg p-6 ring-4 ring-transparent ring-offset-0",
              {
                "bg-green-50 ring-green-400": purchaseOption === "rent",
                "bg-gray-50 ring-gray-400 text-gray-400":
                  purchaseOption === "buy",
              }
            )}
          >
            <div className={cn("flex items-center justify-start")}>
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent" className="ml-1.5 font-semibold text-lg">
                Rent
              </Label>
            </div>
            <p>
              Rate:{" "}
              <span className="font-semibold text-lg ml-2">
                {formatPrice(65)}
              </span>{" "}
              / day
            </p>
            <div className="flex items-center justify-start gap-x-3">
              <p>Total Rental Days:</p>
              <Select
                disabled={purchaseOption === "buy"}
                value={rentalDays}
                onValueChange={(v: "2" | "3" | "5") => setRentalDays(v)}
              >
                <SelectTrigger className="w-[110px] xs:w-[180px] focus:ring-green-400">
                  <SelectValue placeholder="2" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={purchaseOption === "buy"}
              onClick={handleAddToCart}
              className="mt-auto"
            >
              Add To Cart
            </Button>
          </div>
          <Separator
            orientation="vertical"
            className="bg-gray-200 h-64 mx-6 hidden min-[662px]:block"
          />
          <div
            className={cn(
              "flex-1 max-[662px]:w-full max-[662px]:max-w-[365px] flex flex-col gap-y-3 h-64 rounded-lg p-6 ring-4 ring-transparent ring-offset-0",
              {
                "bg-green-50 ring-green-400": purchaseOption === "buy",
                "bg-gray-50 ring-gray-400 text-gray-400":
                  purchaseOption === "rent",
              }
            )}
          >
            <div className={cn("flex items-center justify-start")}>
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy" className="ml-1.5 font-semibold text-lg">
                Buy
              </Label>
            </div>
            <p>
              Price:{" "}
              <span className="font-semibold text-lg ml-2">
                {formatPrice(book.price ?? 450.0)}
              </span>{" "}
            </p>
            <div className="flex items-center justify-start gap-x-3">
              <p>Quantity:</p>
              <Select
                disabled={purchaseOption === "rent"}
                value={quantity}
                onValueChange={(v: "1" | "2" | "3" | "4" | "5") =>
                  setQuantity(v)
                }
              >
                <SelectTrigger className="w-[110px] xs:w-[180px] focus:ring-green-400">
                  <SelectValue placeholder="2" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={purchaseOption === "rent"}
              onClick={handleAddToCart}
              className="mt-auto"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </RadioGroup>
      <div>
        <RelatedBooks
          genre={book.genres && book.genres[1] ? book.genres[1] : "Fiction"}
        />
      </div>
    </div>
  );
};

const RelatedBooks = ({ genre }: { genre: string }) => {
  const [books, setBooks] = useState<z.infer<typeof TBook>[] | null>(null);

  const { isSuccess, data } = useQuery({
    queryKey: ["get-related-books"],
    queryFn: () => getBooks({ genre, page: 0, limit: 8 }),
  });

  useEffect(() => {
    if (isSuccess) {
      const curBooks = processApiResult({ ...data });
      setBooks(curBooks);
    }
  }, [data, isSuccess]);

  return (
    <div className="mt-20">
      <h4 className="text-2xl font-semibold mb-10">You may also like</h4>
      <Carousel>
        <CarouselContent>
          {books &&
            books.map((book) => (
              <CarouselItem
                className="min-[469px]:basis-1/2 md:basis-1/3 select-none flex items-center justify-center"
                key={book.volumeId}
              >
                <BookCard book={book} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="max-md:-left-1" />
        <CarouselNext className="max-md:-right-1" />
      </Carousel>
    </div>
  );
};

const AdditionalInfoSection = ({
  author,
  width,
  height,
  pageCount,
}: {
  author: string;
  width: string;
  height: string;
  pageCount: number;
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-8 text-base">
      <div className="flex flex-col gap-y-2">
        <div>
          <h6>Author:</h6>
          <p>{author}</p>
        </div>
        <div>
          <h6>Total Pages:</h6>
          <p>{pageCount}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          <h6>Width:</h6>
          <p>{width}</p>
        </div>
        <div>
          <h6>Height:</h6>
          <p>{height}</p>
        </div>
      </div>
    </div>
  );
};

const DescriptionDialog = ({ description }: { description: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge
          className="absolute -bottom-1 max-lg:left-0 lg:bottom-6 lg:-right-20 cursor-pointer"
          variant="secondary"
        >
          Read more
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Description</DialogTitle>
          <DialogDescription>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const GenreSection = ({ genres }: { genres: string[] }) => {
  return (
    <div className="max-w-prose flex items-center gap-3 flex-wrap mt-2">
      {genres.map((genre, index) => (
        <Badge
          variant="outline"
          className="cursor-default pointer-events-none select-none"
          key={index}
        >
          {genre}
        </Badge>
      ))}
    </div>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center justify-start gap-x-2">
      {rating >= 1 ? (
        <Star className="w-6 h-6 fill-primary text-primary" />
      ) : rating >= 0.5 ? (
        <StarHalf className="w-6 h-6 fill-primary text-primary" />
      ) : null}
      {rating >= 2 ? (
        <Star className="w-6 h-6 fill-primary text-primary" />
      ) : rating >= 1.5 ? (
        <StarHalf className="w-6 h-6 fill-primary text-primary" />
      ) : null}
      {rating >= 3 ? (
        <Star className="w-6 h-6 fill-primary text-primary" />
      ) : rating >= 2.5 ? (
        <StarHalf className="w-6 h-6 fill-primary text-primary" />
      ) : null}
      {rating >= 4 ? (
        <Star className="w-6 h-6 fill-primary text-primary" />
      ) : rating >= 3.5 ? (
        <StarHalf className="w-6 h-6 fill-primary text-primary" />
      ) : null}
      {rating >= 5 ? (
        <Star className="w-6 h-6 fill-primary text-primary" />
      ) : rating >= 4.5 ? (
        <StarHalf className="w-6 h-6 fill-primary text-primary" />
      ) : null}
    </div>
  );
};

export default BookPage;
