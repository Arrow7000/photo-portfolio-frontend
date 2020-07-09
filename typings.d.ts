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
