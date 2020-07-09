import Head from "next/head";
import { getGetMetadata } from "../components/data";
import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { margin, black, mobileWidth, tabletWidth } from "../components/styles";

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
`;

const HomePhoto = styled.div<{ image: Img }>`
  background-image: url(${({ image }) => image.thumbNail});
  background-size: cover;
  background-position: center;
  padding-top: 100%;
`;

const HomePhotoContainer = styled.div`
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
