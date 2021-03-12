import {CatProdListProps} from "../../../models/PageProps";
import {ProductDataItem} from "../../../models/Product";
import {Container} from "../../blocks/Containers/Container";
import {ProductsList} from "./ProductsList";

import "./products.scss";
import {prodCats, ProdCatType} from "../../../mocks/prodCats";

export const ProductsView = (props: CatProdListProps) => {
  const {prdData = []} = props;

  if (!prdData || !prdData.length) return <></>;

  return (
    <Container>
      {prodCats.map((prodCat: ProdCatType) => {
        const {key} = prodCat;
        const productData: ProductDataItem[] = prdData.filter(
          (prod: ProductDataItem) =>
            (prod.productCategories || []).includes(key)
        );
        console.log({productData});
        return <ProductsList key={key} productKey={key} data={productData} />;
      })}
    </Container>
  );
};
