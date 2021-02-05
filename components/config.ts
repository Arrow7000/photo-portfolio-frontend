const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.SERVER_URL ?? "";

export const apiUrl = serverUrl + "/api";

export const siteUrl = "https://photos.adler.dev";
export const siteName = "Aron Adler Photography";
