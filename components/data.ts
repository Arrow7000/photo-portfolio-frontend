const metadataUrl =
  "https://d3ltknfikz7r4w.cloudfront.net/metadata/metadata.json";

export const getGetMetadata = async () => {
  const res = await fetch(metadataUrl);
  const response = (await res.json()) as Metadata;
  return response;
};
