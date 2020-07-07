import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  getMetadata,
  getSortedAndLargest,
  getSrcSet,
  getImages
} from "../helpers";

const App: NextPage<Metadata> = ({ imagesAndAlbums, sizes }) => {
  const [sortedSizes, largestSize] = getSortedAndLargest(sizes);

  const photos = getImages(imagesAndAlbums);

  return (
    <main>
      <Head>
        <title>Aron's Photo Portfolio</title>
      </Head>

      <h1>Hello world</h1>

      <div>Images are here.</div>
      <div>
        {photos.map(photo => {
          const srcSet = getSrcSet(sortedSizes, photo);

          return (
            <Link
              key={photo.name}
              href={`/photo/[photo]`}
              as={`/photo/${photo.name}`}
            >
              <a>
                <img src={photo.otherSizes[largestSize]} srcSet={srcSet} />
              </a>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

App.getInitialProps = async () => {
  const metadata = await getMetadata();
  return metadata;
};

export default App;
