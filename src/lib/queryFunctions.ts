import axios from "axios";
import { BOOK_API_OPTIONS } from "./config";

export const getBooks = ({
  genre,
  page,
  limit = 8,
}: {
  genre: string;
  page: number;
  limit?: number;
}) => {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${genre}&key=AIzaSyAGNQ9DeJP_67nhf5S4Yf2oR7FtpIUGHj0&startIndex=${page}&maxResults=${limit}`
  );
};

export const search = ({
  searchTerm,
  startIndex = "0",
  maxResults = "8",
}: {
  searchTerm: string;
  startIndex?: string;
  maxResults?: string;
}) => {
  let url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.append("q", searchTerm);
  url.searchParams.append("key", "AIzaSyAGNQ9DeJP_67nhf5S4Yf2oR7FtpIUGHj0");
  url.searchParams.append("startIndex", startIndex);
  url.searchParams.append("maxResults", maxResults);
  console.log(url);
  return axios.get(url.href);
};
