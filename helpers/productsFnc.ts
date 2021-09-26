import {ProductInCart} from "./../models/Product";
import {
  ProductInfo,
  ProductListByCatInfo,
  ProductsForSlideType,
} from "../models/Product";

export const calPrice = (price: number, discount = 0) => {
  return (price * (100 - discount)) / 100;
};

export const orderProductsByCat = (
  products: ProductInfo[]
): ProductListByCatInfo => {
  const productList: ProductListByCatInfo = products.reduce(
    (productsByCat: ProductListByCatInfo, product: ProductInfo) => {
      const {categories} = product;
      (categories || []).forEach((category) => {
        const {id, name, slug} = category;
        if (slug === "uncategorized") {
          return;
        }

        if (!productsByCat[slug]) {
          productsByCat[slug] = {
            catId: id,
            catName: name,
            catSlug: slug,
            products: [],
          };
        }

        productsByCat[slug].products.push(product);
      });

      return productsByCat;
    },
    {}
  );

  return productList;
};

export const filterProductsForSlide = (
  productsListByCat: ProductListByCatInfo
): ProductsForSlideType => {
  const features: ProductInfo[] = [];
  const productsByCat: ProductListByCatInfo = {};

  (Object.keys(productsListByCat) || []).map((catKey: string) => {
    const {products} = productsListByCat[catKey];
    const featureProducts = products.filter(
      (product: ProductInfo) => product.featured
    );
    features.push(...(featureProducts || []));

    productsByCat[catKey] = {
      ...productsListByCat[catKey],
      products: products.slice(0, 8),
    };
  });

  return {
    features,
    productsByCat,
  };
};

export const calculateCartPrice = (carts: ProductInCart[]) =>
  (carts || []).reduce((total: number, cartItem: ProductInCart) => {
    const itemPrice = (cartItem.price as unknown as number) * 1;
    return total + itemPrice * cartItem.quantity;
  }, 0);
