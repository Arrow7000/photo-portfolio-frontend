type Url = string;

type ArrayItem<T> = T extends (infer I)[] ? I : never;

// type SizeObj<T> = T extends (infer S)[] ? { [K in S]: Url } : never;
type SizeObj<T> = { [K in ArrayItem<T>]: Url };

interface Photo<T> {
  name: string;
  original: Url;
  otherSizes: SizeObj<T>;
}

interface Metadata<T extends number[]> {
  sizes: T;
  images: Photo<T>[];
}

// type A = Metadata<[100,200]>;
// declar const a: A;

// a.images[0].otherSizes[100]

type B = SizeObj<[100, 200, 300]>;

declare const b: B;

// b.

type LeastOneInList<T> = { 0: T } & T[];
