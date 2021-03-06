import {ProductBaseItem, ProductDataItem} from "../../models/Product";
import client from "../../utils/ApolloClient";
import {FETCH_ALL_PRODUCTS_QUERY} from "../../utils/gql/gqlQuery";

const productProcess = (productRaw: ProductBaseItem): ProductDataItem => {
  const {
    databaseId,
    id,
    name,
    image,
    onSale,
    productCategories,
    productTags,
    sku,
    status,
    totalSales,
    type,
    visibleProducts,
    manageStock = 0,
    price,
    regularPrice,
    salePrice,
    soldIndividually = "",
    weight,
    width,
    virtual,
    stockQuantity,
    stockStatus,
  } = productRaw;

  const productItem: ProductDataItem = {
    databaseId,
    id,
    name,
    image: image?.sourceUrl || null,
    onSale,
    sku,
    status,
    productCategories: (productCategories.nodes || []).map(
      (category) => category.slug
    ),
    productTags: (productTags.nodes || []).map((tag) => tag.slug),
    totalSales,
    type,
    manageStock,
    // price,
    // regularPrice,
    // salePrice,
    soldIndividually,
    visibleProducts: (visibleProducts.nodes || []).map(
      (visibleProduct) => visibleProduct
    ),
    // weight,
    // width,
    virtual,
    stockQuantity,
    stockStatus,
  };

  if (price) {
    productItem.price = Math.round(parseFloat(price) * 1000) / 1000;
  }

  if (regularPrice) {
    productItem.regularPrice =
      Math.round(parseFloat(regularPrice) * 1000) / 1000;
  }

  if (salePrice) {
    productItem.salePrice = Math.round(parseFloat(salePrice) * 1000) / 1000;
  }

  if (weight) {
    productItem.weight = parseFloat(weight);
  }

  if (width) {
    productItem.width = parseFloat(width);
  }

  return productItem;
};

export const getAllProduct = async (categories?: string | string[]) => {
  try {
    const prodDatas: ProductDataItem[] = [];
    let finished = false;

    const variables = {
      after: null,
      first: 30,
      categoryIn: categories || null,
    };

    while (!finished) {
      const {
        data: {products: {nodes = [], pageInfo = {}} = {}} = {},
      } = await client.query({
        query: FETCH_ALL_PRODUCTS_QUERY,
        variables,
      });
      const {endCursor, hasNextPage} = pageInfo;

      if (nodes.length) {
        nodes.forEach((productRaw: ProductBaseItem) => {
          prodDatas.push(productProcess(productRaw));
        });
      }

      variables.after = endCursor;
      finished = !hasNextPage;
    }

    return prodDatas;
  } catch (error) {
    console.log({error});
    return null;
  }
};
