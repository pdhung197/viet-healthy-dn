import {Carousel} from "antd";
import React, {useState} from "react";
import {CarouselSettings} from "../../../models/Common";
import {ProductImage} from "../../../models/Product";

/* import "./home-carousel.scss"; */

interface ProductImagesProps extends CarouselSettings {
  data: ProductImage[];
  className?: string;
}

export const ProductImages = ({
  data = [],
  className = "",
  ...settings
}: ProductImagesProps) => {
  const [slickIndex, setSlickIndex] = useState(0);

  return (
    <>
      <div className="product-images__image">
        {data && data.length ? (
          data.map((image: ProductImage, index: number) => (
            <img
              className={slickIndex === index ? "active" : ""}
              key={index}
              src={image.src}
              alt={image.alt}
            />
          ))
        ) : (
          <img
            className="active"
            src={`${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`}
            alt=""
          />
        )}
      </div>
      <Carousel
        className={`product-images__thumbnail ${className}`}
        {...settings}
        slidesToShow={2}
        slidesToScroll={2}
        dots={false}
        autoplay={true}
        draggable={true}
        infinite={data.length > 2}
      >
        {data.map((image: ProductImage, index: number) => (
          <div key={image.id}>
            <img
              onClick={() => setSlickIndex(index)}
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};
