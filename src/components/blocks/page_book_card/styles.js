import styled from "styled-components";
import Container from "../../ui/container";

export const PageBookStyle = styled.section`
  width: 100%;
`;

export const PageBookContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  @media(max-width: 47.94em) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const PageBookWrap = styled.div`
  display: grid;
  gap: 20px;

  @media(max-width: 47.94em) {
    gap: 15px;
  }
`;

export const WrapImg = styled.div`
  margin: 0 auto;
`;

export const ImgStyle = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;

  object-fit: cover;
`;
