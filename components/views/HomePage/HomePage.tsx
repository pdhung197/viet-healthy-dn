import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  filterProductsForSlide,
  orderProductsByCat,
} from "../../../helpers/productsFnc";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { HomeProps, PageKeys } from "../../../models/PageProps";
import {
  ProductListByCatInfo,
  ProductsForSlideType,
} from "../../../models/Product";
import { ProductCarousel } from "../../blocks/Carousels/ProductCarousel";
import { Container } from "../../blocks/Containers/Container";
import { VHHead } from "../../blocks/Head/VHHead";
import { Benefits } from "./Benefits";

import "./home.scss";

export const HomePage = (props: Partial<HomeProps>) => {
  const { productsList } = props;
  const { md, lg } = useBreakpoint();
  const { t } = useTranslation();
  const [dataForSlide, setDataForSlide] = useState<ProductsForSlideType>(
    {} as ProductsForSlideType
  );

  const slideToDisplay = lg ? 4 : md ? 3 : 2;

  const carouselRows = md ? 1 : 2;

  useEffect(() => {
    if (dataForSlide && Object.keys(dataForSlide).length) {
      return;
    }
    const productsListByCat = (): ProductListByCatInfo =>
      orderProductsByCat(productsList || []);
    const { features, productsByCat } = filterProductsForSlide(
      productsListByCat()
    );
    setDataForSlide({ features, productsByCat });
  }, [productsList]);

  const { features: featuresData = [], productsByCat: productsByCatData = {} } =
    dataForSlide;

  return (
    <>
      <VHHead />
      <Benefits />
      <Container className="features-products">
        <h2 className="features-products__title">
          {t("pageData.homePage.features.title")}
        </h2>
        <ProductCarousel
          className="features-products__carousel"
          data={featuresData}
          slidesToScroll={slideToDisplay}
          slidesToShow={slideToDisplay}
          infinite={true}
          autoplay={true}
          pauseOnHover={true}
          pauseOnFocus={true}
          swipeToSlide={true}
          dots={false}
          rows={carouselRows}
          speed={1000}
        />
      </Container>
      {(Object.keys(productsByCatData) || []).map((catKey: string) => {
        const { catName, catSlug, products } = productsByCatData[catKey];

        return (
          <Container className="cat-products" key={catKey}>
            <h2 className="cat-products__title">{catName}</h2>
            <ProductCarousel
              className="cat-products__carousel"
              data={products}
              slidesToScroll={slideToDisplay}
              slidesToShow={slideToDisplay}
              infinite={products.length > slideToDisplay}
              autoplay={true}
              pauseOnHover={true}
              pauseOnFocus={true}
              swipeToSlide={true}
              dots={false}
              speed={1000}
              rows={carouselRows}
            />
            <Link href={`/products#${catSlug}`}>
              <span className="cat-products__link">Xem thêm {">>"}</span>
            </Link>
          </Container>
        );
      })}
    </>
  );
};
