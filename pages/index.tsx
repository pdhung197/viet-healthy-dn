import {useContext, useEffect} from "react";
import {HomePage} from "../components/views/HomePage/HomePage";
import {UserContext} from "../contexts/userContext/userContext";
import {HomeProps} from "../models/PageProps";
import {fetchCategoryList} from "../services/apis/categoryApis";
import {fetchAllProducts} from "../services/apis/productApis";

const Home = ({productsList, categoryList}: HomeProps) => {
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

  return (
    <HomePage
      productsList={
        contextProductList && contextProductList.length
          ? contextProductList
          : productsList
      }
    />
  );
};

export async function getStaticProps() {
  const productsList = await fetchAllProducts();
  const categoryList = await fetchCategoryList();

  return {props: {productsList, categoryList}};
}

export default Home;
