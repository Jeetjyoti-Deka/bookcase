"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BookOpenCheck, Calendar, IndianRupee, Search } from "lucide-react";
import { forwardRef, RefObject, useRef } from "react";

const ScrollTimeline = () => {
  const timelineRef = useRef(null);

  return (
    <div
      id="timeline_div"
      ref={timelineRef}
      className="relative overflow-hidden w-full grid grid-cols-1 pl-5 sm:pl-0 pr-2 sm:grid-cols-2 sm:gap-y-16 gap-x-8 pt-10 sm:pt-20"
    >
      <div className="absolute w-[2px] inset-y-0 left-[10px] sm:left-1/2 -translate-x-1/2 bg-zinc-400" />
      <Timeline ref={timelineRef} />
      <div className="w-full sm:h-[195px] bg-transparent block sm:hidden">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          1
        </div>
      </div>
      <Project
        align="left"
        title="Select a book!"
        icon="search"
        description="Explore endless possibilities with our vast selection of books, spanning across diverse genres. Find exactly what you're looking for and uncover new favorites with ease!"
      />
      <div className="w-full sm:h-[195px] bg-transparent hidden sm:block">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          1
        </div>
      </div>
      <div className="w-full sm:h-[195px] bg-transparent flex sm:justify-end mt-6 sm:mt-0 mb-2 sm:mb-0">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          2
        </div>
      </div>
      <Project
        align="right"
        title="Select duration!"
        icon="calendar"
        description="Select the perfect rental duration from our flexible options, ensuring you have ample time to immerse yourself in the pages of your chosen book."
      />
      <div className="w-full sm:h-[195px] bg-transparent block sm:hidden mt-6 sm:mt-0 mb-2 sm:mb-0">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          3
        </div>
      </div>
      <Project
        align="left"
        title="Pay and Order"
        icon="money"
        description=" You'll only be charged for the duration you have the book in your possession, giving you the freedom to read at your own pace without worrying about unnecessary fees."
      />
      <div className="w-full sm:h-[195px] bg-transparent hidden sm:block">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          3
        </div>
      </div>
      <div className="w-full sm:h-[195px] bg-transparent flex sm:justify-end mt-6 sm:mt-0 mb-2 sm:mb-0">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
          4
        </div>
      </div>
      <Project
        align="right"
        title="Enjoy and Return the book"
        icon="book"
        description="Experience hassle-free returns when your rental period ends! Simply return the book at your convenience, without any stress or extra steps. It's that easy to enjoy your reading journey with us."
      />
    </div>
  );
};

const Timeline = forwardRef<HTMLDivElement>((_, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["0.2 1", "0.5 0"],
    layoutEffect: false,
  });

  const scaleProgress = useSpring(scrollYProgress, { damping: 10 });
  return (
    <>
      <motion.div
        style={{
          scaleY: scaleProgress,
        }}
        className="w-[4px] z-0 bg-gradient-to-b from-orange-50 to-orange-500 absolute -top-[1300px] xs:-top-[1100px] left-2 sm:left-[calc(50%-2px)] -translate-x-10 inset-y-0 rounded-b-full"
      />
    </>
  );
});

Timeline.displayName = "Timeline";

const Project = ({
  align,
  title,
  icon,
  description,
}: {
  align: "left" | "right";
  title: string;
  icon: "search" | "calendar" | "money" | "book";
  description: string;
}) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <motion.div
      ref={targetRef}
      style={{
        scale: scaleProgress,
        opacity: scaleProgress,
      }}
      className={cn("sm:w-72 md:w-80 lg:w-96", {
        "place-self-end": align === "left",
      })}
    >
      <Card
        className={cn("flex flex-col bg-gray-50 border-zinc-300", {
          "items-end": align === "left",
          "items-start": align === "right",
        })}
      >
        <CardHeader className="pb-3">
          <CardTitle>
            {icon === "search" ? (
              <Search
                className={cn("w-7 h-7 text-orange-500", {
                  "ml-auto": align === "left",
                })}
              />
            ) : icon === "calendar" ? (
              <Calendar
                className={cn("w-7 h-7 text-orange-500", {
                  "ml-auto": align === "left",
                })}
              />
            ) : icon === "money" ? (
              <IndianRupee
                className={cn("w-7 h-7 text-orange-500", {
                  "ml-auto": align === "left",
                })}
              />
            ) : (
              <BookOpenCheck
                className={cn("w-7 h-7 text-orange-500", {
                  "ml-auto": align === "left",
                })}
              />
            )}
          </CardTitle>
          <CardDescription className="text-zinc-800 font-semibold text-lg">
            {title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={cn("text-base max-w-prose leading-tight text-zinc-500", {
              "text-right": align === "left",
            })}
          >
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default ScrollTimeline;
