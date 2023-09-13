import styled from "styled-components";
import Container from "/src/components/ui/container";

export const FormStyle = styled.form`
  width: 100%;
`;

export const FormContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: row;
  gap: 20px;

  @media(max-width: 63.94em) {
    gap: 15px;
  }

  @media(max-width: 47.94em) {
    flex-direction: column;
    gap: 10px;
  }
`;
