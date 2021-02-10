type Orientation = "square" | "landscape" | "portrait";

type Size = { path: string; width: number; height: number };

type Img = {
  name: string;
  originalPath: string;
  thumbNail: string;
  orientation: Orientation;
  otherSizes: Size[];
};

type ImageContainer = { image: Img };

type Metadata = { imagesAndAlbums: ImageContainer[] };

// New stuff

type Id = string & { _type: unique symbol };

interface NewPhoto {
  id: Id;
  photoHash: string;
  orderIndex: number;
  slug: string;
  title: string;
  description: string;
  height: number;
  width: number;
}

// @TODO: this will need to include width and height actually
interface NewSize {
  width: number;
  imageUrl: string;
}
interface FullPhoto {
  photo: NewPhoto;
  sizes: NewSize[];
}

type NewPhotosResponse = FullPhoto[];

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string
    ? string extends T[K] // this one ensures we're excluding keys of type Id
      ? K
      : never
    : never;
}[keyof T];

type EntryOf<T, K extends keyof T> = [K, T[K]];

type Entries<T> = EntryOf<T, keyof T>[];

type AuthState = "StillUnknown" | "NotLoggedIn" | "LoggedIn";
