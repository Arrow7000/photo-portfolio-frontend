import React, { FC } from "react";
import { siteName, siteUrl } from "./config";
import { getLargestImg, getSmallestImgUrl } from "./helpers";

export const ImageOgTags: FC<{ image: FullPhoto }> = ({
  image: { photo, sizes },
}) => {
  const largestSize = getLargestImg(sizes);
  return (
    <>
      <meta property="og:title" content={photo.title} />
      <meta property="og:image" content={largestSize.imageUrl} />
      <meta property="og:image:width" content={`${largestSize.width}`} />
      <meta
        property="og:image:height"
        content={`${(photo.height / photo.width) * largestSize.width}`}
      />
      <meta property="og:url" content={`${siteUrl}/photo/${photo.slug}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={photo.description} />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
};
