import React from "react";
import { NextPage } from "next";
import {
  getMetadata,
  getSortedAndLargest,
  getSrcSet,
  getImages
} from "../../helpers";

interface Props {
  photo: Photo;
  sizes: Metadata["sizes"];
}

const Photo: NextPage<Props> = ({ photo, sizes }) => {
  const [sortedSizes, largestSize] = getSortedAndLargest(sizes);
  const srcSet = getSrcSet(sortedSizes, photo);

  return (
    <img src={photo.otherSizes[largestSize]} srcSet={srcSet} key={photo.name} />
  );
};

Photo.getInitialProps = async ({ query }) => {
  const photoName = query["photo"] as string;

  const metadata = await getMetadata();

  const photos = getImages(metadata.imagesAndAlbums);

  const photo = photos.find(photo => photo.name === photoName) as Photo;

  return { photo, sizes: metadata.sizes };
};

export default Photo;
