import React from "react";
import { NextPage } from "next";

interface Props {
  photoName: string;
}

const Photo: NextPage<Props> = ({ photoName }) => {
  //     return  <img
  //     src={image.otherSizes[largestSize]}
  //     srcSet={srcSet}
  //     key={image.name}
  //   />

  return <h2>Photo page</h2>;
};

Photo.getInitialProps = async ({ query }) => {
  const photoName = query["photo"] as string;
  return { photoName };
};

export default Photo;
