"use client";

import { useAppSelector } from "@/redux/hooks";

const Page = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div>
      {cart.map((book) => (
        <div key={book.volumeId}>
          {book.bookTitle} - {book.purchaseType}
        </div>
      ))}
    </div>
  );
};
export default Page;
