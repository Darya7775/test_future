import React, { memo } from "react";
import CardBook from "../card";
import type { OneBook } from "../../../slices_redux/types";
import * as S from "./styles";

interface Props {
  books: OneBook[],
  link: string
}

const List: React.FC<Props> = (props: Props) => {
  return(
    <S.BooksSectionStyle>
      <S.BooksContainer>
        <S.BooksListStyle>
        {props.books.map((book, index) => (
          <S.BookItemStyle key={index}>
            <CardBook oneBook={book} link={props.link} />
          </S.BookItemStyle>))
        }
        </S.BooksListStyle>
      </S.BooksContainer>
    </S.BooksSectionStyle>
  );
}

export default memo(List);
