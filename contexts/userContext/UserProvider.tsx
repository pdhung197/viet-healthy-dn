import {useState} from "react";
import {CommonProps} from "../../models/Common";
import {ProductBase} from "../../models/Product";
import {UserContext} from "./userContext";

export const UserProvider = ({children}: CommonProps) => {
  const [productsList, setProducts] = useState<ProductBase[]>([]);
  const [carts, setCarts] = useState({
    productIds: [],
    price: 0,
  });

  const storeProductsData = (products: ProductBase[]) => setProducts(products);

  const providerValue = {
    carts,
    productsList,
    storeProductsData,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
