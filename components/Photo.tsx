import styled from "styled-components";
import { margin } from "./styles";

const Image = styled.img`
  padding: ${margin}px;
  max-height: 100vh;
  max-width: 100vw;
`;

export interface PhotoProps {
  image: Img;
}

export const makeSrcSet = (image: Img) =>
  image.otherSizes.map(({ width, path }) => `${path} ${width}w`).join(",");

export function Photo({ image }: PhotoProps) {
  const srcSet = makeSrcSet(image);

  return <Image srcSet={srcSet} src={image.originalPath} />;
}
