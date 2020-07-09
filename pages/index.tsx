import Head from "next/head";
import { getGetMetadata } from "../components/data";
import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Photo, makeSrcSet } from "../components/Photo";
import { margin, black } from "../components/styles";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { imagesAndAlbums } = await getGetMetadata();

  return { props: { imgs: imagesAndAlbums.map(({ image }) => image) } };
};

interface HomeProps {
  imgs: Img[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  grid-gap: ${margin}px;
`;

const HomePhoto = styled.img`
  border: 10px solid ${black};
`;

export default function Home({ imgs }: HomeProps) {
  return (
    <>
      <Head>
        <title>Aron's Photography Portfolio | photos.adler.dev</title>
      </Head>
      <div className="container">
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
    </>
  );
}
