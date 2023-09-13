import React, { memo } from "react";
import type { OneBook } from "../../../slices_redux/types";
import * as S from "./styles";

interface Props {
  oneBook: OneBook,
  link: string
}

const CardBook: React.FC<Props> = (props: Props) => {
  return(
    <S.LinkBookStyle to={`${props.link}${props.oneBook.id}`}>
      {props.oneBook.volumeInfo?.imageLinks
        ? (<S.WrapImgPoster><S.ImgPoster src={props.oneBook.volumeInfo.imageLinks?.thumbnail} alt="обложка" width={100} height={200} /></S.WrapImgPoster>)
        : (<S.NoPicture>No picture</S.NoPicture>)}
      <S.CategorysStyles>{props.oneBook.volumeInfo.categories && props.oneBook.volumeInfo.categories[0]}</S.CategorysStyles>
      <h2>{props.oneBook.volumeInfo?.title}</h2>
      <span>{props.oneBook.volumeInfo?.authors?.join(", ")}</span>
    </S.LinkBookStyle>
  );
};

export default memo(CardBook);
