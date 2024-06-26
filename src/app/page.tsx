import CustomersSection from "@/components/CustomersSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ScrollTimeline from "@/components/ScrollTimeline";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Book, Check, Plus, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute inset-0 w-full h-screen z-10 bg-black/10 backdrop-blur-sm md:hidden" />
      <div className="absolute inset-0 w-full h-screen z-0">
        <Image
          src="/hero.png"
          width={1440}
          height={1024}
          alt="hero"
          className="w-full h-screen object-cover"
        />
      </div>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col h-screen justify-center items-center sm:items-start text-white px-4 sm:px-16">
        <h1 className="text-2xl text-center mt-24 sm:mt-0 xs:text-4xl md:text-5xl lg:text-6xl font-bold">
          Rent Before You Buy!
        </h1>
        <p className="sm:text-lg text-center sm:text-left md:text-2xl mt-10 sm:ml-1.5 max-w-prose">
          Out of hundreds of books, <br />
          <span className="bg-primary p-1 rounded-sm font-semibold">
            CHOOSE
          </span>{" "}
          the right one for you.
        </p>

        <div className="flex flex-col xs:flex-row flex-wrap sm:flex-nowrap items-center xs:items-start justify-center max-w-3xl mt-10 xs:mt-20 gap-5 sm:gap-0">
          <div className="flex flex-col items-center sm:items-start justify-center">
            <h3 className="flex items-center justify-center md:text-2xl font-semibold">
              10,000
              <Plus
                className="h-5 w-5 text-primary font-bold"
                style={{
                  strokeWidth: "3.5px",
                }}
              />
            </h3>
            <p className="text-zinc-900 md:text-lg font-normal mt-1">
              Titles Available
            </p>
          </div>

          <div className="h-16 hidden sm:block w-px bg-zinc-400 sm:mx-5 " />

          <div className="flex flex-col items-center sm:items-start justify-center my-6 xs:my-0">
            <h3 className="flex items-center justify-center md:text-2xl font-semibold">
              4.5
              <Star className="h-5 w-5 ml-1 text-primary fill-primary font-bold" />
            </h3>
            <p className="text-zinc-900 md:text-lg font-normal mt-1">
              Average Rating
            </p>
          </div>

          <div className="h-16 hidden sm:block w-px bg-zinc-400  sm:mx-5" />

          <div className="flex flex-col items-center sm:items-start justify-center col-span-2">
            <h3 className="flex items-center justify-center md:text-2xl font-semibold whitespace-nowrap">
              Glowing Feedback
              <ThumbsUp className="h-5 w-5 ml-1.5 text-transparent fill-primary" />
            </h3>
            <p className="text-zinc-900 md:text-lg font-normal mt-1">
              &quot;Top Notch Service&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <MaxWidthWrapper>
        <div className="py-40">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <h1 className="text-center text-5xl font-semibold tracking-normal order-2">
              What our customers say
            </h1>
            <div
              className="order-1 lg:order-3
            w-28 sm:w-32 lg:w-40 "
            >
              <Image
                aria-hidden
                src="/books/book-1.svg"
                alt="books"
                width={166}
                height={95}
                className="object-contain w-full"
              />
            </div>
          </div>

          <div className="mt-20">
            <CustomersSection />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="py-40">
        <h3 className="text-center text-5xl font-semibold tracking-normal mb-20">
          How it works
        </h3>
        <ScrollTimeline />
      </div>

      <div className="pb-20 max-sm:px-2">
        <h3 className="text-center text-5xl font-semibold tracking-normal mb-14">
          What we offer
        </h3>

        <div className="flex flex-col sm:flex-row items-center lg:gap-x-20 justify-center sm:ml-10 lg:ml-20">
          <div className="flex flex-col gap-y-2 tracking-wide">
            <div className="flex items-center justify-start">
              <Check className="w-5 h-5 text-primary mr-1.5" />
              <p className="text-xl font-medium">Diverse Selection</p>
            </div>
            <div className="flex items-center justify-start">
              <Check className="w-5 h-5 text-primary mr-1.5" />
              <p className="text-xl font-medium">Flexible Rental Plans</p>
            </div>
            <div className="flex items-center justify-start">
              <Check className="w-5 h-5 text-primary mr-1.5" />
              <p className="text-xl font-medium">
                Convenient Delivery and Returns
              </p>
            </div>
            <div className="flex items-center justify-start">
              <Check className="w-5 h-5 text-primary mr-1.5" />
              <p className="text-xl font-medium">
                Personalized Recommendations
              </p>
            </div>
          </div>

          <div className="w-80 sm:w-96 h-80 sm:h-96 relative">
            <Image
              src="/books/book-2.svg"
              alt="book"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/books"
            className={buttonVariants({
              className: "mt-8 w-full max-w-xs mx-auto",
              size: "lg",
            })}
          >
            Get a book
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
