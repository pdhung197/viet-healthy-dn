import {useContext, useEffect} from "react";
import {HomePage} from "../components/views/HomePage/HomePage";
import {UserContext} from "../contexts/userContext/userContext";
import {HomeProps} from "../models/PageProps";
import {fetchAllProducts} from "../services/apis/productApis";

const Home = ({productsList}: HomeProps) => {
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

  return {props: {productsList}};
}

export default Home;
