import {Col, Row} from "antd";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {prodCats} from "../../../mocks/prodCats";
import {ProductDataItem, ProductInfo} from "../../../models/Product";
import {ProductItem} from "../../blocks/ProductItem/ProductItem";

export const ProductsList = ({
  data,
  catSlug,
  catName,
}: {
  data: ProductInfo[];
  catSlug: string;
  catName: string;
}) => {
  const {currentLang} = useTranslation();

  return (
    <div id={catSlug}>
      <Row gutter={16}>
        <Col xs={{span: 24}}>
          <p className="product__category">{catName}</p>
        </Col>
      </Row>
      <hr className="product__seperator" />
      <Row gutter={[24, 36]}>
        {(data || []).map((product: ProductInfo) => (
          <Col
            key={product.id}
            xs={{span: 24}}
            sm={{span: 12}}
            md={{span: 8}}
            lg={{span: 6}}
          >
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <hr className="product__seperator" />
    </div>
  );
};
