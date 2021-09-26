import { Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/userContext/userContext";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { PageKeys } from "../../../models/PageProps";
import { ProductInfo } from "../../../models/Product";
import { BData, BreadCrumb } from "../../blocks/BreadCrumb/BreadCrumb";
import { ProductCarousel } from "../../blocks/Carousels/ProductCarousel";
import { ProductImages } from "../../blocks/Carousels/ProductImages";
import { Container } from "../../blocks/Containers/Container";
import { SocialContactBtns } from "../../blocks/Footer/SocialContactBtns";
import { VHHead } from "../../blocks/Head/VHHead";
import { ProductActionsGroup } from "../ProductItem/ProductActionsGroup";
import { ProductPrice } from "../ProductItem/ProductPrice";

import "./products.scss";

type ProductDetailProps = {
  product: ProductInfo;
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { t } = useTranslation();
  const { md, lg } = useBreakpoint();
  const { categories, description, images, name, related_ids } = product;
  const { productsList } = useContext(UserContext);

  const slideToDisplay = lg ? 4 : md ? 3 : 2;

  const carouselRows = md ? 1 : 2;

  const bData: BData[] = [
    {
      label: t(`menu.${[PageKeys.products]}`),
      path: "/products",
    },
    {
      label: categories[0].name,
      path: `/products#${categories[0].slug}`,
    },
    {
      label: name,
    },
  ];

  const relateProducts = (productsList || []).filter((product: ProductInfo) =>
    (related_ids || []).includes(product.id)
  );

  return (
    <>
      <VHHead title={name} />
      <Container>
        <BreadCrumb bDatas={bData} />
        <div className="product-detail">
          <Row gutter={[48, 24]}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <ProductImages data={images} autoplay={true} />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <div className="product-detail__sale">
                <h1 className="product-detail__sale__title">{name}</h1>
                <div className="product-detail__sale__price-block">
                  <span>{t("pageData.product.price")}:</span>
                  <ProductPrice
                    product={product}
                    className="product-detail__sale"
                  />
                </div>
                <div className="product-detail__sale__quantity-block">
                  <ProductActionsGroup
                    btns={["add-cart", "payment"]}
                    product={product}
                    className="product-detail__sale"
                  />
                </div>
                <div className="product-detail__sale__social">
                  <div className="product-detail__sale__social--contact">
                    <span>{t("common.footer.contactUs")}:</span>
                    <SocialContactBtns />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }}>
              <div
                className="product-detail__description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Col>
          </Row>
        </div>
        {relateProducts && relateProducts.length && (
          <div className="product-relates">
            <h2 className="product-relates__title">
              {t("pageData.product.relates")}
            </h2>
            <ProductCarousel
              className="product-relates__carousel"
              data={relateProducts}
              slidesToScroll={slideToDisplay}
              slidesToShow={slideToDisplay}
              infinite={relateProducts.length > slideToDisplay}
              autoplay={true}
              pauseOnHover={true}
              pauseOnFocus={true}
              swipeToSlide={true}
              dots={false}
              speed={1000}
              rows={carouselRows}
            />
          </div>
        )}
      </Container>
    </>
  );
};
