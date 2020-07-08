import Head from "next/head";
import { getGetMetadata } from "../components/data";
import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Photo, makeSrcSet } from "../components/Photo";
import { margin } from "../components/styles";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { imagesAndAlbums } = await getGetMetadata();

  return { props: { imgs: imagesAndAlbums.map(({ image }) => image) } };
};

interface HomeProps {
  imgs: Img[];
}

const Grid = styled.div`
  margin: ${margin}px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  grid-gap: ${margin}px;
`;

const HomePhoto = styled.img``;

export default function Home({ imgs }: HomeProps) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid>
          {imgs.map((img) => (
            <Link
              key={img.name}
              href="/photo/[photo]"
              as={`/photo/${img.name}`}
            >
              {/* <a>{img.name}</a> */}
              <a>
                <HomePhoto srcSet={makeSrcSet(img)} src={img.originalPath} />
              </a>
            </Link>
          ))}
        </Grid>
      </main>
    </div>
  );
}
