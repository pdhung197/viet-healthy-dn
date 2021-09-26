import {useEffect, useState} from "react";
import {openNotificationWithIcon} from "../../components/blocks/Notification/Notification";
import {useTranslation} from "../../hooks/useTranslation/useTranslation";
import {CartItem, CartsStore} from "../../models/Cart";
import {CategoryInfo} from "../../models/Category";
import {CommonProps} from "../../models/Common";
import {ProductBase, ProductInCart, ProductInfo} from "../../models/Product";
import {fetchCategoryList} from "../../services/apis/categoryApis";
import {UserContext} from "./userContext";

export const UserProvider = ({children}: CommonProps) => {
  const [productsList, setProducts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [productDetail, setProductDetail] = useState({} as ProductInfo);

  useEffect(() => {
    if (categories && categories.length) {
      return;
    }
    const fetchCategories = async () => {
      const categoryList = await fetchCategoryList();

      if (categoryList && categoryList.length) {
        setCategories(categoryList);
      }
    };

    fetchCategories();
    return () => {
      fetchCategories();
    };
  }, []);

  useEffect(() => {
    if (
      (!carts || !carts.length) &&
      window &&
      window.localStorage.getItem(CartsStore.name)
    ) {
      setCarts(JSON.parse(window.localStorage.getItem(CartsStore.name) || ""));
    }
  }, []);

  const updateCartToContextAndLocalStorage = (updateCarts: ProductInCart[]) => {
    setCarts(updateCarts);

    if (window) {
      window.localStorage.setItem(CartsStore.name, JSON.stringify(updateCarts));
    }
  };

  const storeProductsData = (products: ProductInfo[]) => {
    setProducts(products);
  };
  const storeCategoryList = (categoryList: CategoryInfo[]) => {
    setCategories(categoryList);
  };
  const storeProductDetail = (product: ProductInfo) => {
    if (!product.id) {
      return;
    }
    setProductDetail(product);
  };

  const providerValue = {
    carts,
    productsList,
    storeProductsData,
    categoryList: categories,
    storeCategoryList,
    updateCartToContextAndLocalStorage,
    productDetail,
    storeProductDetail,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
