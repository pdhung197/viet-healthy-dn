export type ProductBase = {
  id: string | number;
  name: string;
  images: string[];
  catKey: string;
  price: number;
  discount?: number;
};
