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
