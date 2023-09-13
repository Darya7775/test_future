import React, { memo } from "react";
import WrapperBaseCon from "../../blocks/wrapper_base_container";

interface Props {
  count: number
}

const Count: React.FC<Props> = (props: Props) => {
  return(
    <WrapperBaseCon>
      <>
        Total: {props.count}
      </>
    </WrapperBaseCon>
  );
};

export default memo(Count);
