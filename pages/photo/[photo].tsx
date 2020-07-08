import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { getGetMetadata } from "../../components/data";
import { Photo, PhotoProps } from "../../components/Photo";

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
`;

function PhotoPage({ image }: PhotoProps) {
  return (
    <main>
      <ImgContainer>
        <Photo image={image} />
      </ImgContainer>
    </main>
  );
}

export default PhotoPage;
