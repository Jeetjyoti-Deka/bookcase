import axios from "axios";
import { BOOK_API_OPTIONS } from "./config";

export const getBooks = () => {
  return axios.request(BOOK_API_OPTIONS);
};
