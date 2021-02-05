import { head, last, sortBy } from "ramda";

export const getLargestImg = (sizes: NewSize[]) =>
  last(sortBy<NewSize>((size) => size.width, sizes)) as NewSize;

export const getSmallestImg = (sizes: NewSize[]) =>
  head(sortBy<NewSize>((size) => size.width, sizes)) as NewSize;

export const stringToSlug = (str: string) => {
  const trimmedAndLower = str.replace(/^\s+|\s+$/g, "").toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;";
  const to = "aaaaeeeeiiiioooouuuuncescrzyuudtn------";

  const replacedChars = from.split("").reduce((str, thisChar, i) => {
    return str.replace(new RegExp(thisChar, "g"), to.charAt(i));
  }, trimmedAndLower);

  return replacedChars
    .replace(".", "-") // replace a dot by a dash
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by a dash
    .replace(/-+/g, "-") // collapse dashes
    .replace(/\//g, ""); // collapse all forward-slashes
};

const entries = <T>(obj: T) => (Object.entries(obj) as unknown) as Entries<T>;

const isNotNullish = <T>(t: T | null | undefined): t is T => !!t;

export const makeTuple = <A, B>(a: A, b: B): [a: A, b: B] => [a, b];

export const getChangedFields = <T>(original: T, copy: T): Entries<T> => {
  const origEntries = entries(original);

  return origEntries
    .map(([key, val]) => (copy[key] !== val ? makeTuple(key, copy[key]) : null))
    .filter(isNotNullish);
};

export const pluraliseStr = (str: string, num: number) =>
  `${str}${num === 1 ? "" : "s"}`;
