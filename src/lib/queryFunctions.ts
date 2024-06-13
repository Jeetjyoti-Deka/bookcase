import axios from "axios";

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
    `https://www.googleapis.com/books/v1/volumes?q=${genre}&orderBy=newest&key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    }&startIndex=${page}&maxResults=${limit}`
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
  url.searchParams.append("orderBy", "newest");
  url.searchParams.append("key", process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
  url.searchParams.append("startIndex", startIndex);
  url.searchParams.append("maxResults", maxResults);
  return axios.get(url.href);
};

export const getSingleBook = (id: string) => {
  return axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );
};
