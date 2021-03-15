import {ReturnData} from "./../../models/Common";
import {ADD_TO_CART} from "./../../utils/gql/gqlMutation";
import {v4 as uuidv4} from "uuid";
import {ProductDataItem} from "../../models/Product";
import client from "../../utils/ApolloClient";
import {returnData} from "../../helpers/common";

export const addProductToCart = async (
  product: ProductDataItem,
  quantity = 1
): Promise<ReturnData> => {
  try {
    const productQueryInput = {
      clientMutationId: uuidv4(), // Generate a unique id.
      productId: product.databaseId,
      quantity,
    };

    const mutationData = await client.mutate({
      mutation: ADD_TO_CART,
      variables: {
        input: productQueryInput,
      },
    });

    return returnData(mutationData.data, true);
  } catch (error) {
    return returnData(error.message, false);
  }
};
