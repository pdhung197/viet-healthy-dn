import {useEffect, useState} from "react";
import {openNotificationWithIcon} from "../../components/blocks/Notification/Notification";
import {useTranslation} from "../../hooks/useTranslation/useTranslation";
import {CartItem, CartsStore} from "../../models/Cart";
import {CategoryInfo} from "../../models/Category";
import {CommonProps} from "../../models/Common";
import {ProductBase, ProductInfo} from "../../models/Product";
import {fetchCategoryList} from "../../services/apis/categoryApis";
import {UserContext} from "./userContext";

export const UserProvider = ({children}: CommonProps) => {
  const {t} = useTranslation();
  const [productsList, setProducts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [productDetail, setProductDetail] = useState({});

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

  const updateCartToContextAndLocalStorage = (updateCarts: any[]) => {
    setCarts(updateCarts);
    /* console.log({updateCarts}); */
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
    setProductDetail(product);
  };

  const addToCart = (product: any) => {
    /* try {
      const indexProductInCart = carts.findIndex(
        (cartItem: any) => cartItem.id === product.id
      );
      if (indexProductInCart > -1) {
        const updatedExistsItem = [
          ...carts.slice(0, indexProductInCart),
          {
            ...product,
            count: carts[indexProductInCart].count + 1,
          },
          ...carts.slice(indexProductInCart + 1),
        ];

        updateCartToLocalStorage(updatedExistsItem);

        setCarts(updatedExistsItem);
      } else {
        const updatedCart = [
          ...carts,
          {
            ...product,
            count: 1,
          },
        ];

        updateCartToLocalStorage(updatedCart);

        setCarts(updatedCart);
      }

      openNotificationWithIcon({
        notifiType: "success",
        message: t("notifications.carts.addSuccessTitle"),
        description: t("notifications.carts.addSuccess", {
          product: product.name,
        }),
      });
    } catch (error) {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.addFailTitle"),
        description: t("notifications.carts.addFail", {product: product.name}),
      });
    } */
  };

  const removeFromCart = (products: Partial<any>[]) => {
    /* try {
      let isCartUpdated = false;
      const updatedCart = products.reduce(
        (newCart: any[], product: Partial<any>) => {
          const {id, count = 1} = product;
          const indexProductInCart = newCart.findIndex(
            (cartItem: any) => cartItem.id === id
          );
          if (
            indexProductInCart < 0 ||
            newCart[indexProductInCart].count === 0
          ) {
            return newCart;
          }

          const prodCountIntCart = newCart[indexProductInCart].count;
          isCartUpdated = true;
          return [
            ...newCart.slice(0, indexProductInCart),
            {
              ...newCart[indexProductInCart],
              count: count > prodCountIntCart ? 0 : prodCountIntCart - count,
            },
            ...newCart.slice(indexProductInCart + 1),
          ];
        },
        carts
      );

      if (!isCartUpdated) {
        return;
      }

      const filteredUpdatedCart = updatedCart.filter(
        (cartItem: any) => cartItem.count > 0
      );

      updateCartToLocalStorage(filteredUpdatedCart);

      setCarts(filteredUpdatedCart);

      openNotificationWithIcon({
        notifiType: "warning",
        message: t("notifications.carts.removeSuccessTitle"),
        description: t("notifications.carts.removeSuccess", {
          product: products[0].name,
        }),
      });
    } catch (error) {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.removeFailTitle"),
        description: t("notifications.carts.removeFail", {
          product: products[0].name,
        }),
      });
    } */
  };

  const providerValue = {
    carts,
    productsList,
    storeProductsData,
    addToCart,
    removeFromCart,
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
