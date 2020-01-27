import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import * as R from "ramda";

type Sizes = [400, 1000, 2000];

const App: NextPage<Metadata<Sizes>> = ({ images, sizes }) => {
  const sortedSizes = R.sort((a, b) => a - b, sizes);
  const largestSize = R.last(sortedSizes);

  if (!largestSize) return null; // should never be the case

  return (
    <main>
      <Head>
        <title>Aron's Photo Portfolio</title>
      </Head>

      <h1>Hello world</h1>

      <p>Sizes are: {sortedSizes.join(", ")}</p>
      <div>Images are here.</div>
      <div>
        {images.map(image => {
          const srcSet = sortedSizes
            .map(size => `${image.otherSizes[size]} ${size}w`)
            .join(", ");

          return (
            <Link
              href={`/photo/[photo]`}
              as={`/photo/${image.name}`}
              key={image.name}
            >
              <a>
                <img src={image.otherSizes[largestSize]} srcSet={srcSet} />
              </a>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

App.getInitialProps = async () => {
  const metadataUrl =
    "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";
  const { data } = await axios.get<Metadata<Sizes>>(metadataUrl);
  return data;
};

export default App;
