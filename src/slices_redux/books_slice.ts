import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import * as T from "./types";

const KEY_API = "AIzaSyDbJMiaorWTC4kbP7HVKDZepQDIAN-nIWU";

const initialState: T.BooksState = {
  status: "idle",
  books: [],
  totalItems: 0,
  params: {
    q: "",
    subject: "",
    orderBy: "relevance",
    startIndex: 0
  },
  count: 1,
  currentPage: 1,
  error: ""
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
}>();

/**
 * Запрос на все книги
 * @param replaceHistory указатель перезаписи в history stack
 * @param isLoadMore указатель: подгружаются ли данные или новая загрузка (необязательный)
 */
export const fetchBooksSearch = createAppAsyncThunk("books/fetchBooks", async (props: {replaceHistory: boolean, isLoadMore?: boolean}, {getState}): Promise<{items: T.OneBook[], totalItems: number}> => {
  // Получение параметров из store
  const param = getState().books.params;

  // Cбор search params
  let urlSearch = `q=${param.q}+subject:${param.subject}&orderBy=${param.orderBy}&startIndex=${param.startIndex}`;

  // Сохранить параметры в адрес страницы
  const url = window.location.pathname + (urlSearch ? `?${urlSearch}`: '') + window.location.hash;
  if(props.replaceHistory) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
  // поля, которые вернуть в объекте ответа
  const fields = `fields=totalItems,items(id,volumeInfo(title,authors,categories,imageLinks(thumbnail)))`;

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${fields}&${urlSearch}&maxResults=30&key=${KEY_API}`);
    const data: {items: T.OneBook[], totalItems: number, isLoadMore?: boolean} = await response.json();
    data.isLoadMore = props.isLoadMore;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {

    // Инициализация параметров, восстановление из адреса
    initParams: (state) => {
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has("q")) {
        // Взять первый элемент перед subject: и удалить пробелы до и после
        state.params.q = urlParams.get("q")?.split("subject:")[0].trim() || "";
        state.params.subject = `${urlParams.get("q")?.split(":")[1]}` || "";
      }
      if(urlParams.has("orderBy")) {
        state.params.orderBy = urlParams.get("orderBy") || "newest"};
    },

    // Установка параметров
    setParams: (state, action: PayloadAction<{ param: string, value: string }>) => {
      switch (action.payload.param) {
        case "q":
          state.params.q = action.payload.value;
          break;
        case "subject":
          state.params.subject = action.payload.value;
          break;
        case "orderBy":
          state.params.orderBy = action.payload.value;
          break;

        default:
          break;
      }
    },

    // Установка индекса последнего элемента
    setLastItems: (state, action: PayloadAction<number>) => {
      state.params.startIndex = action.payload;
    },

    // Сброс параметров к начальным
    resetParams: (state) => {
      state.params.q = "";
      state.params.subject = "";
      state.params.orderBy = "newest";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooksSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksSearch.fulfilled, (state, action: PayloadAction<{items: T.OneBook[], totalItems: number, isLoadMore?: boolean}>) => {
        state.status = "succeeded";
        state.totalItems = action.payload.totalItems;

        // Если подгрузка данных, то дабавляем их в конец
        if(action.payload.isLoadMore) {
          state.books.push(action.payload.items);
        } else { // Если страница перезагружена или новый поиск
          state.books = []; // Удалить предыдущие книги
          state.books.push(action.payload.items); // Добавить новые книги
        }
      })
      .addCase(fetchBooksSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

export default booksSlice.reducer;

export const { initParams, setParams, resetParams, setLastItems } = booksSlice.actions;
