import {ProductInCart, ProductInfo} from "./../../models/Product";
import {ReturnData} from "./../../models/Common";
import {ADD_TO_CART} from "./../../utils/gql/gqlMutation";
import {v4 as uuidv4} from "uuid";
import {ProductDataItem} from "../../models/Product";
import client from "../../utils/ApolloClient";
import {returnData} from "../../helpers/common";

export const mutationAddCart = async (
  product: ProductInfo,
  quantity = 1
): Promise<ReturnData> => {
  try {
    const dataCart: ProductInCart[] = JSON.parse(
      window.localStorage.getItem("cart") || "[]"
    );
    const {id} = product;
    const productExistsInCartIndex = dataCart.findIndex(
      (prd: ProductInCart) => prd.id === id
    );
    if (productExistsInCartIndex > -1) {
      dataCart[productExistsInCartIndex].quantity =
        dataCart[productExistsInCartIndex].quantity + quantity;
    } else {
      dataCart.push({
        ...product,
        quantity,
      });
    }

    return returnData(dataCart, true);
  } catch (error) {
    return returnData(error.message, false);
  }
};
