import {axiosClient} from "../../utils/axiosClient";
import {ProductInfo, ProductParams} from "../../models/Product";

export const productApiUrl = {
  products: "/products",
};

export const fetchProductList = async (
  params: ProductParams = {}
): Promise<ProductInfo[]> => {
  const url = productApiUrl.products;

  return await axiosClient({
    url,
    params,
  });
};

export const fetchAllProducts = async (
  params: ProductParams = {}
): Promise<ProductInfo[]> => {
  let page = 1;
  const per_page = 100;

  const productsData: ProductInfo[] = [];
  let existsNextPage = true;

  while (existsNextPage) {
    const nextPageProductList = await fetchProductList({
      ...params,
      page,
      per_page,
    });

    if (nextPageProductList && nextPageProductList.length) {
      page++;
      productsData.push(...nextPageProductList);
    } else {
      existsNextPage = false;
    }
  }

  return productsData;
};
