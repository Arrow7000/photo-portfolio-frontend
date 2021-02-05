import { apiUrl } from "./config";

const metadataUrl =
  "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";

export const getGetMetadata = async () => {
  const res = await fetch(metadataUrl);
  const response = (await res.json()) as Metadata;
  return response;
};

export const getAllPhotos = async () => {
  const url = apiUrl + "/photos";
  const res = await fetch(url);
  const response = (await res.json()) as FullPhoto[];
  return response;
};

export const getPhotoById = async (id: Id) => {
  const url = apiUrl + `/photo/${id}`;
  const res = await fetch(url);
  const response = (await res.json()) as FullPhoto;
  return response;
};

export const getPhotoBySlug = async (slug: string) => {
  const url = apiUrl + `/photo/slug/${slug}`;
  const res = await fetch(url);
  const response = (await res.json()) as FullPhoto;
  return response;
};
