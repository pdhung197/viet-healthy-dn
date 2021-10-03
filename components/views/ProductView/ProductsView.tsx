import { CatProdListProps, PageKeys } from "../../../models/PageProps";
import { Container } from "../../blocks/Containers/Container";
import { ProductsList } from "./ProductsList";

import "./products.scss";
import React, { useState } from "react";
import { Col, Row } from "antd";
import { VHHead } from "../../blocks/Head/VHHead";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ViewModes } from "../../../models/Common";
import { ViewModeBtn } from "../../blocks/ViewMode/ViewMode";

export const ProductsView = (props: CatProdListProps) => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.grid);
  const { productsList = {} } = props;
  const { t } = useTranslation();
  /* console.log({productsList}); */
  return (
    <Container>
      <VHHead title={t(`menu.${[PageKeys.products]}`)} />
      {(Object.keys(productsList) || []).map((slug: string) => {
        const { catId, catName, catSlug, products } = productsList[slug];

        return products && products.length ? (
          <div id={catSlug} key={catId}>
            <Row gutter={16}>
              <Col xs={{ span: 24 }}>
                <p className="product__category">
                  <span>{catName}</span>
                  <ViewModeBtn
                    mode={viewMode}
                    onChangeMode={(newMode: ViewModes) => setViewMode(newMode)}
                  />
                </p>
              </Col>
            </Row>
            <hr className="product__seperator" />
            <Row className={`viewmode-${viewMode}`} gutter={[24, 36]}>
              <ProductsList data={products} />
            </Row>
            <hr className="product__seperator" />
          </div>
        ) : null;
      })}
    </Container>
  );
};
