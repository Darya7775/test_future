import React, { memo } from "react";
import * as S from "./style";
import Wrapper from "../wrapper_no_container";
import Button from "../../ui/button";

interface Props {
  children: JSX.Element,
  action?: string,
  method?: string,
  onSubmit: (e: React.SyntheticEvent) => void,
  onReset?: (e: React.SyntheticEvent) => void,
  textButton: string
}

const Form: React.FC<Props> = (props: Props) => {
  return(
    <S.FormStyle action={props.action} method={props.method} onSubmit={props.onSubmit}>
      <S.FormContainer>
        {props.children}
        <Wrapper>
          <>
          <Button type="reset" onClick={props.onReset}>Reset</Button>
          <Button type="submit">{props.textButton}</Button>
          </>
        </Wrapper>
      </S.FormContainer>
    </S.FormStyle>
  );
}

export default memo(Form);
