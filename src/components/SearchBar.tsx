"use client";

import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = ({
  setSearchTerm,
  isPending,
  setGenre,
}: {
  isPending: boolean;
  setSearchTerm: Dispatch<SetStateAction<string | null>>;
  setGenre: Dispatch<SetStateAction<string | null>>;
}) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setSearchTerm(term);
        setGenre(null);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [setSearchTerm, term, setGenre]);

  return (
    <div className="w-full flex items-center justify-center pt-6 pb-10">
      <div className="relative">
        <Input
          className="rounded-full w-[300px] sm:w-[500px] pr-14 border-2 border-zinc-300 focus-visible:ring-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-orange-400 transition-all"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button
          disabled={isPending}
          className="absolute top-0 right-0 rounded-full"
          onClick={() => {
            setSearchTerm(term);
            setGenre(null);
          }}
        >
          <Search className="w-6 h-6  text-white" />
        </Button>
      </div>
    </div>
  );
};
export default SearchBar;
