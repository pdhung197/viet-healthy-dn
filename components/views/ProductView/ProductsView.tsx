import {CatProdListProps} from "../../../models/PageProps";
import {ProductBase} from "../../../models/Product";
import {Container} from "../../blocks/Containers/Container";
import {ProductsList} from "./ProductsList";

import "./products.scss";

export const ProductsView = (props: CatProdListProps) => {
  const {products} = props;

  if (!products || !Object.keys(products).length) return <></>;

  return (
    <Container>
      {Object.keys(products).map((productKey: string) => {
        const productData: ProductBase[] = products[productKey];

        return (
          <ProductsList
            key={productKey}
            productKey={productKey}
            data={productData}
          />
        );
      })}
    </Container>
  );
};
