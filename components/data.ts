import axios from "axios";
import { apiUrl } from "./config";

const metadataUrl =
  "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";

export const getGetMetadata = async () => {
  const res = await axios.get<Metadata>(metadataUrl);
  return res.data;
};

export const getAllPhotos = async () => {
  const url = apiUrl + "/photos";
  const res = await axios.get<FullPhoto[]>(url);

  return res.data;
};

export const getPhotoById = async (id: Id) => {
  const url = apiUrl + `/photo/${id}`;
  const res = await axios.get<FullPhoto>(url);
  return res.data;
};

export const getPhotoBySlug = async (slug: string) => {
  const url = apiUrl + `/photo/slug/${slug}`;
  const res = await axios.get<FullPhoto>(url);
  return res.data;
};
