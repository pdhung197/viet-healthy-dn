import {prodCats} from "./prodCats";
import faker from "faker";
import {ProductBase} from "../models/Product";

export const product = (cat: string, index?: number): ProductBase => {
  faker.locale = "vi";
  const fakeName = faker.commerce.productName();
  const id = index !== undefined ? cat + index : faker.random.uuid();

  const imgWidth = faker.random.number({min: 400, max: 500});
  const imgHeight = faker.random.number({min: 400, max: 600});

  const prod = {
    id,
    name:
      fakeName +
      " " +
      faker.lorem.words(faker.random.number({min: 1, max: 10})),
    images: Array.from(
      {length: faker.random.number({min: 1, max: 10})},
      () => `https://loremflickr.com/${imgWidth}/${imgHeight}/food`
    ),
    catKey: cat,
    price: parseFloat(faker.commerce.price()) * 1000,
    discount: faker.random.number({min: 0, max: 10}),
  };
  return prod;
};
