import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getMetadata, getSortedAndLargest, getSrcSet } from "../helpers";

const App: NextPage<Metadata> = ({ images, sizes }) => {
  const [sortedSizes, largestSize] = getSortedAndLargest(sizes);

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
          const srcSet = getSrcSet(sortedSizes, image);

          return (
            <Link
              key={image.name}
              href={`/photo/[photo]`}
              as={`/photo/${image.name}`}
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
  const metadata = await getMetadata();
  return metadata;
};

export default App;
