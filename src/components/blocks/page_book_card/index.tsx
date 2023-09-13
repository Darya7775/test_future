import React, { memo } from "react";
import { OneBookPage } from "../../../slices_redux/types";
import * as S from "./styles";

interface Props {
  book: OneBookPage
}

const PageBookCard: React.FC<Props> = (props: Props) => {
  return(
    <S.PageBookStyle>
      <S.PageBookContainer>
        {props.book &&  <> {props.book.imageLinks?.small
                            ? (<S.WrapImg><S.ImgStyle src={props.book.imageLinks.small} alt="обложка" width={200} height={350} /></S.WrapImg>)
                            : (<span>No picture</span>)}
                          <S.PageBookWrap>
                            {props.book.categories && <p>{props.book.categories.join(" / ")}</p>}
                            <h2>{props.book.title}</h2>
                            {props.book.authors && <p>{props.book.authors.join(", ")}</p>}
                            {props.book.description && <p dangerouslySetInnerHTML={{__html: props.book.description}}></p>}
                          </S.PageBookWrap>
                        </>
        }
      </S.PageBookContainer>
    </S.PageBookStyle>
  );
};

export default memo(PageBookCard);
