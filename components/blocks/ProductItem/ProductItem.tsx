import Image from "next/image";
import Link from "next/link";
import {ProductDataItem} from "../../../models/Product";
import {ProductBtns} from "./ProductBtns";
import {useProducts} from "../../../hooks/useProducts/useProducts";

import "./product-item.scss";
import {CartItem} from "../../../models/Cart";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

type ProductItem = {
  product: ProductDataItem;
};

export const ProductItem = ({product}: ProductItem) => {
  const {t, currentLang} = useTranslation();

  const {
    databaseId,
    id,
    image,
    name,
    onSale,
    productCategories,
    productTags,
    sku,
    status,
    totalSales,
    type,
    visibleProducts,
    manageStock,
    price,
    regularPrice,
    salePrice,
    soldIndividually,
    weight,
    width,
    virtual,
    stockQuantity,
    stockStatus,
  } = product;

  return (
    <div id={`product${id}`} className="product-card">
      <Link href={`/product/${id}`}>
        <a>
          <div className="product-card__describ">
            <div className="product-card__describ--hot"></div>
            <div className="product-card__describ--main-img">
              <Image
                layout="fill"
                src={
                  !image || image.includes("woocommerce-placeholder")
                    ? "/images/LogoTransThumb.png"
                    : image
                }
                alt={name}
                className="product-card__describ--img"
                quality={100}
                sizes="128px"
              />
            </div>
          </div>
          <h4 className="product-card__title">{name}</h4>
        </a>
      </Link>
      <h5 className="product-card__price">
        {salePrice && (
          <del>{(regularPrice || 0).toLocaleString(currentLang)}</del>
        )}
        <span>{(price || 0).toLocaleString(currentLang)} VNĐ</span>
      </h5>
      <div className="product-card__prod-btns">
        <ProductBtns product={product} />
      </div>
    </div>
  );
};
