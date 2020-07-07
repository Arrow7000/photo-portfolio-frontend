/// <reference path="./typings.d.ts" />

import Axios from "axios";
import * as R from "ramda";

export type Sizes = [400, 1000, 2000];

export async function getMetadata() {
  const metadataUrl =
    "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";
  const { data } = await Axios.get<Metadata>(metadataUrl);
  return data;
}

export function getSortedAndLargest(sizes: number[]): [number[], number] {
  const sortedSizes = R.sort((a, b) => a - b, sizes);
  const largestSize = R.last(sortedSizes) as number;

  return [sortedSizes, largestSize];
}

export const getSrcSet = (sortedSizes: number[], image: Photo) =>
  sortedSizes.map(size => `${image.otherSizes[size]} ${size}w`).join(", ");

const isAlbum = (x: AlbumOrImage): x is Album => !!(x as Album).album;
const isImage = (x: AlbumOrImage): x is Image => !!(x as Image).image;

export const getAlbums = (albumsOrImgs: AlbumOrImage[]) =>
  albumsOrImgs.filter(isAlbum).map(x => x.album);

export const getImages = (albumsOrImgs: AlbumOrImage[]) =>
  albumsOrImgs.filter(isImage).map(x => x.image);
