import styled from "styled-components";
import { margin, black, mobileWidth } from "./styles";
import { sortBy } from "ramda";

const Image = styled.img`
  border: ${margin * 2}px solid ${black};
  max-height: calc(100vh - ${margin * 2}px);
  max-width: calc(100vw - ${margin * 2}px);
  object-fit: contain;

  @media (min-width: ${mobileWidth}px) {
    border-width: ${margin * 3}px;
  }
`;

export interface PhotoProps {
  image: Img;
}

export const makeSrcSet = (image: Img) =>
  sortBy((size) => size.width, image.otherSizes)
    .map(({ width, path }) => `${path} ${width}w`)
    .join(",");

export function Photo({ image }: PhotoProps) {
  const srcSet = makeSrcSet(image);

  return <Image srcSet={srcSet} src={image.originalPath} />;
}
