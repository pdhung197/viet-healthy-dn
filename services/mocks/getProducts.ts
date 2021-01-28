import {ProductBase} from "./../../models/Product";
import {prodCats, ProdCatType} from "./../../mocks/prodCats";
import faker from "faker";
import {timeout} from "../../helpers/common";
import {product} from "../../mocks/product";

type DataType = {
  [key in string]: ProductBase[];
};

const generateProduct = (cat?: string) => {
  const products: DataType = {};
  const selectedCat = cat
    ? prodCats.find((prodCat: ProdCatType) => prodCat.key === cat)?.key ||
      "other"
    : undefined;

  prodCats.map((prodCat: ProdCatType) => {
    if (selectedCat && selectedCat !== prodCat.key) return;
    const productCount = faker.random.number({min: 15, max: 30});
    products[prodCat.key] = Array.from({length: productCount}, () =>
      product(prodCat.key)
    );
  });

  return products;
};

export const getProducts = async (cat?: string) => {
  await timeout(1000);
  const data = generateProduct(cat);
  return data;
};
