import {prodCats} from "./prodCats";
import faker from "faker";
import {ProductBase} from "../models/Product";

export const product = (cat?: string): ProductBase => {
  faker.locale = "vi";
  const prod = {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    images: Array.from(
      {length: faker.random.number({min: 1, max: 10})},
      () =>
        `https://loremflickr.com/${faker.random.number(
          500
        )}/${faker.random.number(500)}/food`
    ),
    catKey:
      cat ||
      prodCats[faker.random.number({min: 0, max: prodCats.length - 1})].key,
    price: parseFloat(faker.commerce.price()),
    discount: faker.random.number({min: 0, max: 10}),
  };
  return prod;
};
