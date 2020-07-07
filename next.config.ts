// const Axios = require("axios");
// import Axios from "axios";
import { getMetadata } from "./helpers";
// const { getMetadata } = require("./helpers");

// async function getMetadata() {
//   const metadataUrl =
//     "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";
//   const { data } = await Axios.get(metadataUrl);
//   return data;
// }

module.exports = {
  async exportPathMap() {
    const { imagesAndAlbums } = await getMetadata();

    const pages = imagesAndAlbums.reduce(
      (pages, img) => ({
        ...pages,
        ...{
          [`/photo/${img.name}`]: { page: "/photo/[photo]" },
        },
      }),
      {}
    );

    return {
      ...pages,
      ...{
        "/": { page: "/" },
      },
    };
  },
};
