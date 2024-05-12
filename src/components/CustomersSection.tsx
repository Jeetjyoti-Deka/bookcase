/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const REVIEW_USERS = [
  {
    name: "John Doe",
    value: "user-1",
    image: "/users/user-1.png",
  },
  {
    name: "John Doe",
    value: "user-2",
    image: "/users/user-2.png",
  },
  {
    name: "John Doe",
    value: "user-3",
    image: "/users/user-3.png",
  },
];

const CustomersSection = () => {
  const [activeUser, setActiveUser] = useState("user-1");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8">
      <div className="col-span-2">
        <UserReview activeUser={activeUser} />
      </div>
      <div className="col-span-2 md:col-span-1">
        <div className="flex flex-col gap-y-6">
          <UserTabs activeUser={activeUser} setActiveUser={setActiveUser} />
        </div>
      </div>
    </div>
  );
};

const UserTabs = ({
  activeUser,
  setActiveUser,
}: {
  activeUser: string;
  setActiveUser: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row gap-x-4 md:gap-x-0 md:flex-col md:gap-y-6 mt-10 md:mt-0">
      {REVIEW_USERS.map((user) => (
        <div
          key={user.value}
          className={cn(
            "w-full flex flex-col xs:flex-row items-center justify-between xs:px-4 lg:px-8 border border-zinc-300 py-2 md:py-4 rounded-md hover:bg-gray-50 transition-all cursor-pointer",
            {
              "border-primary shadow-lg hover:bg-white":
                activeUser === user.value,
            }
          )}
          onClick={() => setActiveUser(user.value)}
        >
          <div className="relative h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt="user image"
              fill
              className="object-contain w-full"
            />
          </div>
          <h3 className="text-sm xs:text-lg font-medium">John Doe</h3>
        </div>
      ))}
    </div>
  );
};

const UserReview = ({ activeUser }: { activeUser: string }) => {
  if (activeUser === "user-3") {
    return (
      <div className="flex flex-col max-md:items-center justify-center h-full transition-all">
        <div className="flex items-center justify-center md:justify-start gap-x-3">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
        </div>
        <p className="max-w-prose max-md:text-center text-base font-normal tracking-wide mt-4">
          Discovering this book renting website has been a game-changer for me.
          As someone who never found joy in reading before, I was initially
          drawn in by their promise of smooth service and good customer care.
          Little did I know that this simple decision would ignite a passion for
          books within me. With each rental, I found myself becoming more
          engrossed in the stories, until reading became a habit I couldn't
          shake.
          <span className="bg-slate-700 text-white p-1">
            Now, I'm proud to call myself an avid reader, all thanks to this
            website.
          </span>
        </p>
      </div>
    );
  }

  if (activeUser === "user-2") {
    return (
      <div className="flex flex-col max-md:items-center justify-center h-full transition-all">
        <div className="flex items-center justify-center md:justify-start gap-x-3">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
        </div>
        <p className="max-w-prose max-md:text-center text-base font-normal tracking-wide mt-4">
          If you're a book lover like me, look no further -{" "}
          <span className="bg-slate-700 text-white p-1">
            this website is a game-changer.{" "}
          </span>{" "}
          The service is unbelievably smooth; I was able to find and rent my
          favorite titles with ease, all from the comfort of my home. But what
          truly sets them apart is their exceptional customer care. I absolutely
          loved my experience with them.
        </p>
      </div>
    );
  }

  if (activeUser === "user-1") {
    return (
      <div className="flex flex-col max-md:items-center justify-center h-full transition-all">
        <div className="flex items-center justify-center md:justify-start gap-x-3">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
          <Star className="h-5 w-5 fill-primary text-primary" />
        </div>
        <p className="max-w-prose max-md:text-center text-base font-normal tracking-wide mt-4  max-md:min-h-[168px]">
          From the moment I signed up, I knew I was in for a treat. This website{" "}
          <span className="bg-slate-700 text-white p-1">
            offers a level of service that's hard to come by elsewhere.
          </span>{" "}
          The entire process, from selecting my books to their timely delivery,
          was seamless. Needless to say, I loved every aspect of my experience.
        </p>
      </div>
    );
  }
};
export default CustomersSection;
