import { ProductInCart } from "./../models/Product";
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
      const { categories, status } = product;
      (categories || []).forEach((category) => {
        const { id, name, slug } = category;
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

  return Object.keys(productList)
    .sort()
    .reduce((obj: ProductListByCatInfo, key: string) => {
      obj[key] = productList[key];
      return obj;
    }, {});
};

export const filterProductsForSlide = (
  productsListByCat: ProductListByCatInfo
): ProductsForSlideType => {
  const features: ProductInfo[] = [];
  const productsByCat: ProductListByCatInfo = {};

  (Object.keys(productsListByCat) || []).map((catKey: string) => {
    const { products } = productsListByCat[catKey];
    const featureProducts = products.filter(
      (product: ProductInfo) => product.featured
    );
    features.push(...(featureProducts || []));

    productsByCat[catKey] = {
      ...productsListByCat[catKey],
      products: products.slice(0, 12),
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

export const checkIfProductImgExists = (src: string) => {
  const img = new Image();
  img.src = src;

  if (img.complete) {
    return true;
  } else {
    img.onload = () => {
      return true;
    };

    img.onerror = () => {
      return false;
    };
  }
};

export const getProductImage = (product: ProductInfo): string => {
  const { id, images, name } = product;

  let imgSrc = `${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`;

  if (
    !(
      !images ||
      !images.length ||
      !images[0] ||
      images[0].src.includes("woocommerce-placeholder")
    )
  ) {
    const imgSrcs = images[0].src.split(".");

    imgSrc = `${imgSrcs.slice(0, imgSrcs.length - 1).join(".")}-200x200.${
      imgSrcs[imgSrcs.length - 1]
    }`;
  }

  return imgSrc;
};
