type Url = string;

type NumObject = { [x: number]: Url };

interface Photo {
  name: string;
  original: Url;
  otherSizes: NumObject;
}

interface Metadata {
  sizes: number[];
  images: Photo[];
}
