import faker from "faker";
import {timeout} from "../../helpers/common";
import {product} from "../../mocks/product";
import {ProductBase} from "../../models/Product";

const generateProduct = (cat?: string) => {
  const productCount = faker.random.number({min: 5, max: 20});
  const data = Array.from({length: productCount}, () => product(cat));
  return data;
};

export const getProducts = async (cat?: string) => {
  await timeout(3000);
  const data = generateProduct(cat);
  return data;
};
