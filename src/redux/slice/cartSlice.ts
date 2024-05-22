import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartBook {
  volumeId: string;
  bookTitle: string;
  bookImage: string | null;
  quantity: number | null;
  purchaseType: "rent" | "buy";
  rentalDays: number | null;
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
  },
});

export const { addBook } = cartSlice.actions;

export default cartSlice.reducer;
