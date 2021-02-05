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
import { getLargestImgUrl } from "../components/helpers";
import { makeSrcSet } from "../components/Photo";
import { siteName } from "../components/config";

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

const HomePhoto = styled.img<{ w: number; h: number }>`
  max-width: initial; // to reset CSS reset 🙄

  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: calc(100% * ${({ w, h }) => `${w} / ${h}`});
`;

const HomePhotoContainer = styled.div`
  overflow-x: hidden;
  position: relative;
  padding-top: 100%;
`;

export default function Home({ imgs }: HomeProps) {
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      <div className="container">
        <main>
          <Grid>
            {imgs.map((img) => {
              const srcSet = makeSrcSet(img);

              return (
                <Link key={img.photo.id} href={`/photo/${img.photo.slug}`}>
                  <a>
                    <HomePhotoContainer>
                      <HomePhoto
                        h={img.photo.height}
                        w={img.photo.width}
                        srcSet={srcSet}
                        src={getLargestImgUrl(img.sizes)}
                      />
                    </HomePhotoContainer>
                  </a>
                </Link>
              );
            })}
          </Grid>
        </main>
      </div>
    </>
  );
}
