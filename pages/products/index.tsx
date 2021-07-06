import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import {ProductDetail} from "../../components/views/ProductView/ProductDetail";
import {ProductsView} from "../../components/views/ProductView/ProductsView";
import {UserContext} from "../../contexts/userContext/userContext";
import {orderProductsByCat} from "../../helpers/productsFnc";
import {ProductsProps} from "../../models/PageProps";
import {ProductInfo, ProductListByCatInfo} from "../../models/Product";
import {fetchCategoryList} from "../../services/apis/categoryApis";
import {fetchAllProducts} from "../../services/apis/productApis";

const Products = ({productsList, categoryList}: ProductsProps) => {
  const {
    productsList: contextProductList,
    storeProductsData,
    storeCategoryList,
  } = useContext(UserContext);
  const {query} = useRouter();
  const {pid} = query;

  const pageProductsList =
    contextProductList && contextProductList.length
      ? contextProductList
      : productsList;

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

  const productsListByCat = (): ProductListByCatInfo =>
    orderProductsByCat(pageProductsList);

  if (pid && pid.length && pageProductsList && pageProductsList.length) {
    const productData = pageProductsList.find(
      (product: ProductInfo) => product.id.toString() === pid
    );

    if (productData) {
      return <ProductDetail product={productData} />;
    }
  }

  return <ProductsView productsList={productsListByCat()} />;
};

export async function getStaticProps() {
  const productsList = await fetchAllProducts();
  const categoryList = await fetchCategoryList();

  return {props: {productsList, categoryList}};
}

export default Products;
