import Head from "next/head";
import { getAllPhotos } from "../components/data";
import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import {
  margin,
  mobileWidth,
  tabletWidth,
  desktopWidth,
} from "../components/styles";
import { getSmallestImg } from "../components/helpers";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPhotos = await getAllPhotos();

  return { props: { imgs: allPhotos } };
};

interface HomeProps {
  imgs: FullPhoto[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: ${margin}px;

  @media (min-width: ${mobileWidth}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${tabletWidth}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${desktopWidth}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const HomePhoto = styled.div<{ image: FullPhoto }>`
  background-image: url(${({ image }) => getSmallestImg(image.sizes).imageUrl});
  background-size: cover;
  background-position: center;
  padding-top: 100%;
`;

const HomePhotoContainer = styled.div``;

export default function Home({ imgs }: HomeProps) {
  return (
    <>
      <Head>
        <title>Aron Adler Photography</title>
      </Head>
      <div className="container">
        <main>
          <Grid>
            {imgs.map((img) => (
              <Link key={img.photo.id} href={`/photo/${img.photo.slug}`}>
                <a>
                  <HomePhotoContainer>
                    <HomePhoto image={img} />
                  </HomePhotoContainer>
                </a>
              </Link>
            ))}
          </Grid>
        </main>
      </div>
    </>
  );
}
