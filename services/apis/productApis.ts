import { axiosClient } from "../../utils/axiosClient";
import { ProductInfo, ProductParams } from "../../models/Product";

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
  let page = params.page || 1;
  const per_page = params.per_page || 100;

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

export const fetchProductData = async (
  idOrSlug: string | number
): Promise<ProductInfo | null> => {
  const urlWithId = productApiUrl.products + "/" + idOrSlug;

  const dataWithId = await axiosClient({
    url: urlWithId,
  });

  if (dataWithId && dataWithId.id) {
    return dataWithId;
  }

  const dataWithSlug = await fetchProductList({
    slug: idOrSlug as string,
  });

  if (dataWithSlug && dataWithSlug.length) {
    return dataWithSlug[0];
  }

  return null;
};
