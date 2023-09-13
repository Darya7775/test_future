import React, { memo } from "react";
import * as S from "./styles";

interface Props {
  options: {
    value: string,
    title: string
  }[],
  value: any,
  onChange: (arg0: string) => void
}

const Select: React.FC<Props> = (props: Props) => {

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => props.onChange(e.target.value);

  return (
    <S.SelectStyle value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </S.SelectStyle>
  )
}

export default memo(Select);
