import {Col, Row} from "antd";
import {ProductInfo} from "../../../models/Product";
import {ProductItem} from "../../blocks/ProductItem/ProductItem";

export const ProductsList = ({data}: {data: ProductInfo[]}) => {
  return (
    <>
      {(data || []).map((product: ProductInfo) => (
        <Col
          key={product.id}
          xs={{span: 12}}
          sm={{span: 12}}
          md={{span: 8}}
          lg={{span: 6}}
        >
          <ProductItem product={product} />
        </Col>
      ))}
    </>
  );
};
