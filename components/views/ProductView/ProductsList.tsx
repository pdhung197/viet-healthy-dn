import {Col, Row} from "antd";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {prodCats} from "../../../mocks/prodCats";
import {ProductBase} from "../../../models/Product";
import {ProductItem} from "../../blocks/ProductItem/ProductItem";

export const ProductsList = ({
  data,
  productKey,
}: {
  data: ProductBase[];
  productKey: string;
}) => {
  const {currentLang} = useTranslation();

  const prodCat = prodCats.find((p) => p.key === productKey);

  if (!prodCat) return <></>;

  return (
    <>
      <Row gutter={16}>
        <Col xs={{span: 24}}>
          <p className="product__category">{prodCat.label[currentLang]}</p>
        </Col>
      </Row>
      <Row gutter={[36, 36]}>
        {(data || []).map((product: ProductBase) => (
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
      <hr />
    </>
  );
};
