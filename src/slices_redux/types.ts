export type FetchingStatus = "idle" | "loading" | "succeeded" | "failed";

export type OneBook = {
  id: string,
  volumeInfo: {
    title: string,
    imageLinks: {
      thumbnail: string
    },
    categories: string[],
    authors: string[]
  }
}

interface State {
  status: FetchingStatus,
  error: string | undefined,
}

export interface BooksState extends State {
  params: {
    q: string,
    subject: string,
    orderBy: string,
    startIndex: number
  }
  count: number,
  currentPage: number,
  books: OneBook[][],
  totalItems: number
}

export type OneBookPage = {
  title: string,
  imageLinks: {
    small: string
  },
  categories: string[],
  authors: string[],
  description: string
}

export interface OneBookState extends State {
  oneBook: OneBookPage
}


