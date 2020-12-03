import Head from "next/head";
import { getGetMetadata } from "../components/data";
import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import {
  margin,
  mobileWidth,
  tabletWidth,
  desktopWidth,
} from "../components/styles";
import { siteUrl } from "../components/config";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { imagesAndAlbums } = await getGetMetadata();

  return { props: { imgs: imagesAndAlbums.map(({ image }) => image) } };
};

interface HomeProps {
  imgs: Img[];
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

const HomePhoto = styled.div<{ image: Img }>`
  background-image: url(${({ image }) => image.thumbNail});
  background-size: cover;
  background-position: center;
  padding-top: 100%;
`;

const HomePhotoContainer = styled.div``;

export default function Home({ imgs }: HomeProps) {
  return (
    <>
      <Head>
        <title>Aron Adler Photography | {siteUrl}</title>
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
