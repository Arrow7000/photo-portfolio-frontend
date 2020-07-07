type Url = string;

type NumObject = { [x: number]: Url };

interface Photo {
  name: string;
  original: Url;
  otherSizes: NumObject;
}

type Album = {
  album: {
    name: string;
    photos: Photo[];
  };
};
type Image = { image: Photo };

type AlbumOrImage = Album | Image;

interface Metadata {
  sizes: number[];
  imagesAndAlbums: AlbumOrImage[];
}
