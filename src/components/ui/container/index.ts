import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: ${(props) => props.theme.indent};

  @media(max-width: 89.97em) {
    padding: ${(props) => props.theme.indentDesktop};
  }

  @media(max-width: 63.97em) {
    padding: ${(props) => props.theme.indentTablet};
  }

  @media(max-width: 47.97em) {
    padding: ${(props) => props.theme.indentMobile};
  }
`;

export default Container;
