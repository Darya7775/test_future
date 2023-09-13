import React, { memo } from "react";
import { WrapperContainerStyle } from "./styles";

interface Props {
  children: JSX.Element,
}

const WrapperBaseCon: React.FC<Props> = (props: Props) => {
  return(
    <WrapperContainerStyle>
      {props.children}
    </WrapperContainerStyle>
  );
};

export default memo(WrapperBaseCon);
