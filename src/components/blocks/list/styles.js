import styled from "styled-components";
import Container from "../../ui/container";

export const BooksSectionStyle = styled.section`
  width: 100%;
`;

export const BooksContainer = styled(Container)`
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const BooksListStyle = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 30px 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media(max-width: 80em) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media(max-width: 63.94em) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media(max-width: 47.94em) {
    gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
`;

export const BookItemStyle = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${props => props.theme.colorGrey};
  padding: 10px;
`;
