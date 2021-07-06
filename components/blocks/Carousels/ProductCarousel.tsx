import {Carousel} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import {CarouselSettings} from "../../../models/Common";
import {ProductInfo} from "../../../models/Product";
import {ProductItem} from "../ProductItem/ProductItem";

interface ProductCarouselProps extends CarouselSettings {
  data: ProductInfo[];
  className?: string;
}

export const ProductCarousel = ({
  data,
  className = "",
  ...settings
}: ProductCarouselProps) => {
  return (
    <Carousel className={`product-carousel ${className}`} {...settings}>
      {(data || []).map((product: ProductInfo) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Carousel>
  );
};
