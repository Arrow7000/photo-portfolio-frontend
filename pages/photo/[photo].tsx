import { GetStaticPaths, GetStaticProps } from "next";
import { getGetMetadata } from "../../src/data";

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

interface PhotoProps {
  image: Img;
}

function Photo({ image }: PhotoProps) {
  return (
    <div>
      <h1>Photo page here 👋</h1>
      <p>
        Source is <code>{image.name}</code>
      </p>
      <img src={image.originalPath} style={{ height: 1000, width: 1000 }} />
    </div>
  );
}

export default Photo;
