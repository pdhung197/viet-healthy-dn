import {axiosClient} from "../../utils/axiosClient";
import {OrderRequest} from "../../models/Cart";

const orderApiUrl = {
  order: "/orders",
};

export const submitNewOrder = async (newOrder: OrderRequest): Promise<any> => {
  const url = orderApiUrl.order;

  return await axiosClient({
    method: "post",
    url,
    data: newOrder,
  });
};
