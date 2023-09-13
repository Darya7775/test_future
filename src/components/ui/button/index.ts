import styled from "styled-components";

const Button = styled.button`
  display: block;
  border: none;
  box-shadow: 0 0 0 1px ${props => props.theme.colorBlue};
  border-radius: 5px;
  // состояние active
  background-color: ${props => props.disabled ? props.theme.colorBlue : props.theme.colorWhite };
  padding: 10px;

  color: ${props => props.disabled ? props.theme.colorWhite : props.theme.colorBlue };

  cursor: pointer;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
    }
  }
`;

export default Button;
