import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices_redux/books_slice";
import oneBookSlice from "./slices_redux/one_book_slice";

const store = configureStore({
  reducer: {
    books: bookSlice,
    oneBook: oneBookSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
