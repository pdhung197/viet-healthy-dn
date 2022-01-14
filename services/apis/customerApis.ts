import { CustomerCreateInfo, CustomerInfo } from "./../../models/Customer";
import { axiosClient } from "../../utils/axiosClient";

const customersApiUrl = {
  customers: "/customers",
};

export const createNewCustomer = async (
  newCustomer: CustomerCreateInfo
): Promise<any> => {
  const url = customersApiUrl.customers;

  return await axiosClient({
    method: "post",
    url,
    data: newCustomer,
  });
};

export const getCustomerByPhone = async (
  phoneAsEmail: string
): Promise<CustomerInfo | null> => {
  const url = customersApiUrl.customers;

  const customers: CustomerInfo[] = await axiosClient({
    url,
    params: {
      search: phoneAsEmail,
    },
  });

  if (!customers || !customers.length) {
    return null;
  }

  const matchCustomer = customers.find(
    (customer: CustomerInfo) => customer.username === phoneAsEmail
  );

  if (!matchCustomer) {
    return null;
  }

  return matchCustomer;
};
