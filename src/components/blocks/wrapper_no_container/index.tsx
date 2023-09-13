import React, { memo } from "react";
import { StyleWrapper } from "./styles";

interface Props {
  children: JSX.Element,
}

const Wrapper: React.FC<Props> = (props: Props) => {
  return(
    <StyleWrapper>
      {props.children}
    </StyleWrapper>
  );
};

export default memo(Wrapper);
