import React, {useContext, useEffect} from "react";
import {ProductsView} from "../../components/views/ProductView/ProductsView";
import {UserContext} from "../../contexts/userContext/userContext";
import {ProductsProps} from "../../models/PageProps";
import {fetchCategoryList} from "../../services/apis/categoryApis";
import {
  fetchAllProducts,
  productListByCat,
} from "../../services/apis/productApis";

const Products = ({productsList, categoryList}: ProductsProps) => {
  const {
    productsList: contextProductList,
    storeProductsData,
    storeCategoryList,
  } = useContext(UserContext);

  useEffect(() => {
    if (categoryList) {
      storeCategoryList(categoryList);
    }
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
  const categoryList = await fetchCategoryList();

  return {props: {productsList, categoryList}};
}

export default Products;
