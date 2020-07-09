const metadataUrl =
  "https://aron-photo-portfolio.s3-ap-southeast-2.amazonaws.com/metadata/metadata.json";

export const getGetMetadata = async () => {
  const res = await fetch(metadataUrl);
  const response = (await res.json()) as Metadata;
  return response;
};
