import Image from "next/image";
import Link from "next/link";
import {ProductInfo} from "../../../models/Product";
import {ProductBtns} from "./ProductBtns";
import {useProducts} from "../../../hooks/useProducts/useProducts";

import "./product-item.scss";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

type ProductItem = {
  product: ProductInfo;
};

export const ProductItem = ({product}: ProductItem) => {
  const {t, currentLang} = useTranslation();

  const {id, images, name, sale_price, regular_price, price} = product;

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
                  !images ||
                  !images.length ||
                  !images[0] ||
                  images[0].src.includes("woocommerce-placeholder")
                    ? `${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`
                    : images[0].src
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
        {sale_price && (
          <del>
            {((regular_price as unknown as number) / 1 || 0).toLocaleString(
              currentLang
            )}
          </del>
        )}
        <span>
          {((price as unknown as number) / 1 || 0).toLocaleString(currentLang)}{" "}
          VNĐ
        </span>
      </h5>
      <div className="product-card__prod-btns">
        <ProductBtns product={product} />
      </div>
    </div>
  );
};
