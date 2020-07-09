import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { getGetMetadata } from "../../components/data";
import { Photo, PhotoProps } from "../../components/Photo";
import { useRef } from "react";
import { siteUrl } from "../../components/config";
import { margin } from "../../components/styles";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getGetMetadata();
  const paths = response.imagesAndAlbums.map(({ image }) => ({
    params: { photo: image.name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  PhotoProps,
  { photo: string }
> = async ({ params: { photo } }) => {
  const response = await getGetMetadata();

  const img = response.imagesAndAlbums.find(
    ({ image }) => image.name === photo
  );

  return { props: { image: img.image } };
};

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${margin}px;
`;

function PhotoPage({ image }: PhotoProps) {
  const photoRef = useRef<HTMLDivElement>();

  return (
    <>
      <Head>
        <title>
          Photo {image.name} | {siteUrl}
        </title>
      </Head>
      <main>
        <ImgContainer id="photo" ref={photoRef}>
          <div onClick={() => photoRef.current.scrollIntoView()}>
            <Photo image={image} />
          </div>
        </ImgContainer>
      </main>
    </>
  );
}

export default PhotoPage;
