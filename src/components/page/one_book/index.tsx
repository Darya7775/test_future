import React, { useEffect, memo } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { useParams } from "react-router-dom";
import { fetchOneBook } from "../../../slices_redux/one_book_slice";
import PageBookCard from "../../blocks/page_book_card";
import Spinner from "../../ui/spinner";

const OneBook: React.FC = () => {
  const dispatch = useAppDispatch();

  const { idBook } = useParams() as { idBook: string };

  useEffect(() => {
    (async() => {
      console.log("loadPage")
      await dispatch(fetchOneBook(idBook));
    })()
  }, []);

  const oneBook = useAppSelector(state => state.oneBook.oneBook);
  const status = useAppSelector(state => state.oneBook.status);
  const error = useAppSelector(state => state.oneBook.error);

  let content;

  if(status === "loading") {
    content = <Spinner text="Loading..." />
  } else if(status === "succeeded") {
    content = <PageBookCard book={oneBook} />
  } else if(status === "failed") {
    content = <div>{error}</div>
  }

  return(
    <main>
      {content}
    </main>
  );
};

export default memo(OneBook);
