import { Button } from "@/components/ui/button";
import { Plus, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute inset-0 w-full h-screen z-10 bg-black/10 backdrop-blur-sm md:hidden" />
      <div className="absolute inset-0 w-full h-screen z-0">
        <Image
          src="/hero-2.png"
          width={1440}
          height={1024}
          alt="hero"
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="relative z-50 flex flex-col h-screen justify-center items-center sm:items-start text-white px-4 sm:px-16">
        <h1 className="text-2xl text-center mt-24 sm:mt-0 xs:text-4xl md:text-5xl lg:text-6xl font-bold">
          Try Before Committing
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
    </main>
  );
}
