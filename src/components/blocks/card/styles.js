import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const img = css`
  width: auto;
  min-width: 100px;
  max-width: 150px;
  height: auto;
  max-height: 250px;
  min-height: 200px;
`;

export const LinkBookStyle = styled(Link)`
  display: grid;
  justify-items: center;
  gap: 5px;

  width: fit-content;

  position: relative;

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 1em;
    line-height: 24px;
    text-align: center;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.1);
    }
  }
`;

export const ImgPoster = styled.img`
  ${img};
  object-fit: cover;

  transition: transform .35s ease-out;

  @media(max-width: 25em) {
    object-fit: contain;
  }
`;

export const WrapImgPoster = styled.div`
  display: grid;
  justify-content: center;

  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const NoPicture = styled.span`
  ${img};

  box-shadow: 0px 0px 1px 1px #5a95dd;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategorysStyles = styled.span`
  color: ${props => props.theme.colorBlue};
`;
