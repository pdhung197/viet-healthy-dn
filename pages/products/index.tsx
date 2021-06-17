import React, {useContext, useEffect} from "react";
import {ProductsView} from "../../components/views/ProductView/ProductsView";
import {UserContext} from "../../contexts/userContext/userContext";
import {ProductsProps} from "../../models/PageProps";
import {
  fetchAllProducts,
  productListByCat,
} from "../../services/apis/productApis";

const Products = ({productsList}: ProductsProps) => {
  const {productsList: contextProductList, storeProductsData} =
    useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchAllProducts();
      if (data && data.length) {
        storeProductsData(data);
      }
    };

    if (!contextProductList || !contextProductList.length) {
      fetchProducts();
    }
  }, []);
  const productsListByCat = productListByCat(
    contextProductList && contextProductList.length
      ? contextProductList
      : productsList
  );

  return <ProductsView productList={productsListByCat} />;
};

export async function getStaticProps() {
  const productsList = await fetchAllProducts();
  // const productsListByCat = productListByCat(productsList);
  return {props: {productsList: productsList}};
}

export default Products;
