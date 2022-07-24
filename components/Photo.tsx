import styled, { css } from "styled-components";
import { margin, siteContentWidth } from "./styles";
import { sortBy } from "ramda";
import { getLargestImgUrl, getOrientation } from "./helpers";

/**
 * @TODO it would be good if we could make square images have the same styling as landscape images on mobile but portrait styling on desktop. Atm they have the same styling as portrait images.
 */
const ImageContainer = styled.div<PhotoProps>`
  display: flex;

  /* For centering in the middle of the page */
  margin: 0 auto;

  img {
    aspect-ratio: ${({ image }) => image.photo.width / image.photo.height} / 1;
  }

  .description {
    width: 100%;
    max-width: ${siteContentWidth}px;

    p {
      font-size: 1.3rem;
    }
  }

  ${({ image }) => {
    const { photo } = image;
    const { description } = photo;

    const orientation = getOrientation(photo);

    if (orientation === "landscape") {
      return css`
        flex-direction: column;
        align-items: center;

        img {
          max-height: 100vh;
        }

        .description {
          margin: ${margin * 2}px auto ${margin}px;
          p {
            padding: 0 15px;
          }
        }
      `;
    } else {
      return css`
        max-width: ${siteContentWidth}px;
        padding: 0 ${margin}px;

        ${description === "" &&
        css`
          /* Center if there's no description to push the image aside for */
          justify-content: center;
          flex-wrap: wrap;
        `}

        img {
          max-width: min(70vw, ${siteContentWidth * 0.7}px);
          max-height: 125vh;
        }

        .description {
          margin: 0 ${margin}px 0 ${margin * 2}px;
        }
      `;
    }
  }}
`;

export interface PhotoProps {
  image: FullPhoto;
}

export const makeSrcSet = (image: FullPhoto) =>
  sortBy((size) => size.width, image.sizes)
    .map(({ width, imageUrl }) => `${imageUrl} ${width}w`)
    .join(",");

export function Photo({ image }: PhotoProps) {
  const srcSet = makeSrcSet(image);

  return (
    <ImageContainer image={image}>
      <img srcSet={srcSet} src={getLargestImgUrl(image.sizes)} />
      {image.photo.description !== "" && (
        <div className="description">
          <p>{image.photo.description}</p>
        </div>
      )}
    </ImageContainer>
  );
}
