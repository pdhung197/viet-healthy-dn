import {Carousel} from "antd";

import "./home-carousel.scss";
import Link from "next/link";

export const HomeCarousel = () => {
  return (
    <Carousel className="home-carousel" autoplay>
      <Link href="/products">
        <a className="home_carousel__item">
          <img
            alt="Mountains"
            src="/images/products/banner_KhoangSet_tuizip.jpg"
          />
        </a>
      </Link>
      <Link href="/products">
        <a className="home_carousel__item">
          <img
            alt="Mountains"
            src="/images/products/banner_Daudua_SachaINchi_2sp.jpg"
          />
        </a>
      </Link>
      <Link href="/products">
        <a className="home_carousel__item">
          <img alt="Mountains" src="/images/products/banner_caphe_matong.jpg" />
        </a>
      </Link>
    </Carousel>
  );
};
