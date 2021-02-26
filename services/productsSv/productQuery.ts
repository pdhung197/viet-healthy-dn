import {ProductBaseItem, ProductItem} from "../../models/Product";
import client from "../../utils/ApolloClient";
import {FETCH_ALL_PRODUCTS_QUERY} from "../../utils/gql/gqlQuery";

const productProcess = (productRaw: ProductBaseItem): ProductItem => {
  const {
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
  } = productRaw;

  const productItem: ProductItem = {
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
    price,
    regularPrice,
    salePrice,
    soldIndividually,
    visibleProducts: (visibleProducts.nodes || []).map(
      (visibleProduct) => visibleProduct
    ),
    weight,
    width,
    virtual,
  };

  return productItem;
};

export const getAllProduct = async (categories?: string | string[]) => {
  try {
    const prodDatas: ProductItem[] = [];
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
