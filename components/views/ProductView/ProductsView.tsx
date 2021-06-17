import {CatProdListProps} from "../../../models/PageProps";
import {Container} from "../../blocks/Containers/Container";
import {ProductsList} from "./ProductsList";

import "./products.scss";

export const ProductsView = (props: CatProdListProps) => {
  const {productList = {}} = props;
  console.log({productList});
  return (
    <Container>
      {(Object.keys(productList) || []).map((slug: string) => {
        const {catId, catName, catSlug, products} = productList[slug];

        return products && products.length ? (
          <ProductsList
            key={catId}
            catSlug={catSlug}
            catName={catName}
            data={products}
          />
        ) : null;
      })}
    </Container>
  );
};
