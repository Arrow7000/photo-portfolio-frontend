import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { getAllPhotos, getPhotoBySlug } from "../../components/data";
import { Photo, PhotoProps } from "../../components/Photo";
import { useRef } from "react";
import { margin } from "../../components/styles";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPhotos = await getAllPhotos();
  const paths = allPhotos.map((fullPhoto) => ({
    params: { photo: fullPhoto.photo.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  PhotoProps,
  { photo: string }
> = async ({ params }) => {
  const image = await getPhotoBySlug(params?.photo as string);

  return { props: { image } };
};

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${margin}px;
`;

const ClickContainer = styled.div`
  cursor: pointer;
`;

function PhotoPage({ image }: PhotoProps) {
  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>{image.photo.title} | Aron Adler Photography</title>
      </Head>
      <main>
        <ImgContainer id="photo" ref={photoRef}>
          <ClickContainer onClick={() => photoRef.current?.scrollIntoView()}>
            <Photo image={image} />
          </ClickContainer>
        </ImgContainer>
      </main>
    </>
  );
}

export default PhotoPage;
