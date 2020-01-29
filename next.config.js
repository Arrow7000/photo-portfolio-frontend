const Axios = require("axios");

async function getMetadata() {
  const metadataUrl =
    "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";
  const { data } = await Axios.get(metadataUrl);
  return data;
}

module.exports = {
  async exportPathMap() {
    const { images } = await getMetadata();

    const pages = images.reduce(
      (pages, img) => ({
        ...pages,
        ...{
          [`/photo/${img.name}`]: { page: "/photo/[photo]" }
        }
      }),
      {}
    );

    return {
      ...pages,
      ...{
        "/": { page: "/" }
      }
    };
  }
};
