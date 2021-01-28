import {prodCats, ProdCatType} from "./../../mocks/prodCats";
import faker from "faker";
import {timeout} from "../../helpers/common";
import {product} from "../../mocks/product";

const generateCombo = () => {
  const productCount = faker.random.number({min: 5, max: 10});
  const data = Array.from({length: productCount}, () => product("combo"));
  return data;
};

export const getCombos = async () => {
  await timeout(1000);
  const data = generateCombo();
  return data;
};
