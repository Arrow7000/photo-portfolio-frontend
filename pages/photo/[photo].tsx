import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { getAllPhotos, getPhotoBySlug } from "../../components/data";
import { Photo } from "../../components/Photo";
import { useEffect, useRef, useState } from "react";
import { margin } from "../../components/styles";
import { useRouter } from "next/router";
import { siteName, siteUrl } from "../../components/config";
import { getLargestImgUpTo } from "../../components/helpers";

interface PhotoPageProps {
  image?: FullPhoto; // not present for fallback pages
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPhotos = await getAllPhotos();

  const paths = allPhotos.map((fullPhoto) => ({
    params: { photo: fullPhoto.photo.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  PhotoPageProps,
  { photo: string }
> = async ({ params }) => {
  const image = params ? await getPhotoBySlug(params.photo) : undefined;

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

function PhotoPage({ image: propImage }: PhotoPageProps) {
  const router = useRouter();
  const { photo: photoSlug } = router.query;
  const [image, setImage] = useState(propImage);

  useEffect(() => {
    if (!propImage && photoSlug) {
      getPhotoBySlug(photoSlug as string).then(setImage);
    }
  }, [photoSlug]);

  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>
          {(image ? image.photo.title : photoSlug) ?? "Photo"} | {siteName}
        </title>

        {/* IIFE so we don't have to repeat the getLargestImgUpTo call again and again */}
        {image &&
          (() => {
            const largestPic = getLargestImgUpTo(image.sizes, 800);
            return (
              <>
                <meta
                  key="title"
                  property="og:title"
                  content={image.photo.title}
                />
                <meta name="description" content={image.photo.description} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image" content={largestPic.imageUrl} />
                <meta
                  property="og:image:secure_url"
                  content={largestPic.imageUrl}
                />
                <meta
                  property="og:image:width"
                  content={`${largestPic.width}`}
                />
                <meta
                  property="og:image:height"
                  content={`${
                    (image.photo.height / image.photo.width) * largestPic.width
                  }`}
                />
                <meta
                  property="og:url"
                  content={`${siteUrl}/photo/${image.photo.slug}`}
                />
                <meta property="og:site_name" content={siteName} />
                <meta
                  property="og:description"
                  content={image.photo.description}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={image.photo.title} />
                <meta
                  property="twitter:description"
                  content={image.photo.description}
                />
                <meta property="twitter:image" content={largestPic.imageUrl} />
                <meta property="twitter:site" content="@Aron_Adler" />
                <meta property="twitter:creator" content="@Aron_Adler" />
              </>
            );
          })()}
      </Head>
      <main>
        {image && (
          <>
            <h1>{image.photo.title}</h1>
            <ImgContainer id="photo" ref={photoRef}>
              <ClickContainer
                onClick={() => photoRef.current?.scrollIntoView()}
              >
                <Photo image={image} />
              </ClickContainer>
            </ImgContainer>
          </>
        )}
      </main>
    </>
  );
}

export default PhotoPage;
