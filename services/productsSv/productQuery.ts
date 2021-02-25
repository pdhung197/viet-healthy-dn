import {ProductBaseItem} from "../../models/Product";
import client from "../../utils/ApolloClient";
import {FETCH_ALL_PRODUCTS_QUERY} from "../../utils/gql/gqlQuery";

export const getAllProduct = async () => {
  try {
    const prodDatas: ProductBaseItem[] = [];
    let fetchCursor: string = (null as unknown) as string;
    let finished = false;

    while (!finished) {
      const {
        data: {products: {nodes = [], pageInfo = {}} = {}} = {},
      } = await client.query({
        query: FETCH_ALL_PRODUCTS_QUERY,
        variables: {after: fetchCursor, first: 30},
      });
      const {endCursor, hasNextPage} = pageInfo;

      if (nodes.length) {
        prodDatas.push(...nodes);
      }

      fetchCursor = endCursor;
      finished = !hasNextPage;
    }

    return prodDatas;
  } catch (error) {
    console.log({error});
    return null;
  }
};
