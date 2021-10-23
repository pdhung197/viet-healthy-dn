import { Col } from "antd";
import { ViewModes } from "../../../models/Common";
import { ProductInfo } from "../../../models/Product";
import { ProductItem } from "../ProductItem/ProductItem";

export const ProductsList = ({
  data,
  viewMode,
}: {
  data: ProductInfo[];
  viewMode: ViewModes;
}) => {
  return (
    <>
      {(data || []).map((product: ProductInfo) => (
        <Col
          key={product.id}
          xs={{ span: 12 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
        >
          <ProductItem product={product} />
        </Col>
      ))}
    </>
  );
};
