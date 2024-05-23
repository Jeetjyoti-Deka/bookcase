import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartBook {
  volumeId: string;
  bookTitle: string;
  bookImage: string | null;
  quantity: number | null;
  purchaseType: "rent" | "buy";
  rentalDays: number | null;
  price: number | null;
  rentalPrice: number | null;
}

const initialState: CartBook[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<CartBook>) => {
      const bookExist = state.find(
        (book) => action.payload.volumeId === book.volumeId
      );
      if (bookExist) {
        const index = state.indexOf(bookExist);
        state[index] = { ...action.payload };
      } else {
        state.push(action.payload);
      }
    },
    removeBook: (state, action: PayloadAction<CartBook>) => {
      return state.filter((book) => book.volumeId !== action.payload.volumeId);
    },
  },
});

export const { addBook, removeBook } = cartSlice.actions;

export default cartSlice.reducer;
