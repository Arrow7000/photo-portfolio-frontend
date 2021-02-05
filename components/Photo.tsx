import styled from "styled-components";
import { margin, mobileWidth, tabletWidth } from "./styles";
import { sortBy } from "ramda";
import { getLargestImgUrl } from "./helpers";

const Image = styled.img`
  max-height: calc(100vh - ${margin * 2}px);
  max-width: calc(100vw - ${margin * 2}px);
  object-fit: contain;

  @media (min-width: ${mobileWidth}px) and (min-height: ${mobileWidth}px) {
    border-width: ${margin * 2}px;
  }

  @media (min-width: ${tabletWidth}px) and (min-height: ${tabletWidth}px) {
    border-width: ${margin * 3}px;
  }
`;

interface PhotoProps {
  image: FullPhoto;
}

export const makeSrcSet = (image: FullPhoto) =>
  sortBy((size) => size.width, image.sizes)
    .map(({ width, imageUrl }) => `${imageUrl} ${width}w`)
    .join(",");

export function Photo({ image }: PhotoProps) {
  const srcSet = makeSrcSet(image);

  return (
    <Image
      height={image.photo.height}
      width={image.photo.width}
      srcSet={srcSet}
      src={getLargestImgUrl(image.sizes)}
    />
  );
}
