import {CatProdListProps} from "../../../models/PageProps";
import {ProductDataItem} from "../../../models/Product";
import {Container} from "../../blocks/Containers/Container";
import {ProductsList} from "./ProductsList";

import "./products.scss";

export const ProductsView = (props: CatProdListProps) => {
  const {products, prdData = []} = props;

  if (!products || !Object.keys(products).length) return <></>;

  return (
    <Container>
      {Object.keys(products).map((productKey: string) => {
        const productData: ProductDataItem[] = prdData.filter(
          (prod: ProductDataItem) =>
            (prod.productCategories || []).includes(productKey)
        );
        console.log({productData});
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
