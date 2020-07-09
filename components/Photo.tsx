import styled from "styled-components";
import { margin, black } from "./styles";
import { sortBy } from "ramda";

const border = margin * 3;

const Image = styled.img`
  border: ${border}px solid ${black};
  max-height: calc(100vh - ${margin * 2}px);
  max-width: calc(100vw - ${margin * 2}px);
  object-fit: contain;
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
