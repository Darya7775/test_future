import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OneBookState, OneBookPage } from "./types";
import type { PayloadAction } from '@reduxjs/toolkit';

const KEY_API = "AIzaSyDbJMiaorWTC4kbP7HVKDZepQDIAN-nIWU";

/**
 * Запрос на одну книгу
 * @param idBook id книги
 */
export const fetchOneBook = createAsyncThunk("oneBook/fetchOneBook", async (idBook: string): Promise<OneBookPage> => {
  // поля, которые вернуть в объекте ответа
  const fields = `fields=volumeInfo(title,authors,categories,description,imageLinks(small))`;
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${idBook}?${fields}&key=${KEY_API}`);
    const data: { volumeInfo: OneBookPage } = await response.json();
    console.log(data)
    return data.volumeInfo;
  } catch (error: any) {
    throw new Error(error);
  }
});

const initialState: OneBookState = {
  status: "idle",
  error: "",
  oneBook: {
    title: "",
    imageLinks: {
      small: ""
    },
    categories: [],
    authors: [],
    description: ""
  }
}

const oneBook = createSlice({
  name: "oneBook",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOneBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneBook.fulfilled, (state, action: PayloadAction<OneBookPage>) => {
        state.status = "succeeded";
        state.oneBook = action.payload;
      })
      .addCase(fetchOneBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default oneBook.reducer;

