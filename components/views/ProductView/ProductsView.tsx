import {CatProdListProps} from "../../../models/PageProps";
import {Container} from "../../blocks/Containers/Container";
import {ProductsList} from "./ProductsList";

import "./products.scss";
import React from "react";
import {Col, Row} from "antd";

export const ProductsView = (props: CatProdListProps) => {
  const {productsList = {}} = props;
  /* console.log({productsList}); */
  return (
    <Container>
      {(Object.keys(productsList) || []).map((slug: string) => {
        const {catId, catName, catSlug, products} = productsList[slug];

        return products && products.length ? (
          <div id={catSlug} key={catId}>
            <Row gutter={16}>
              <Col xs={{span: 24}}>
                <p className="product__category">{catName}</p>
              </Col>
            </Row>
            <hr className="product__seperator" />
            <Row gutter={[24, 36]}>
              <ProductsList data={products} />
            </Row>
            <hr className="product__seperator" />
          </div>
        ) : null;
      })}
    </Container>
  );
};
