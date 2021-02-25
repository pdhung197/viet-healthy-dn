import {HomePage} from "../components/views/HomePage/HomePage";
import {HomeProps} from "../models/PageProps";
import {getProducts} from "../services/mocks/getProducts";
import {getAllProduct} from "../services/productsSv/productQuery";

const Home = (props: HomeProps) => {
  return <HomePage {...props} />;
};

export async function getStaticProps() {
  const prdData = await getAllProduct();

  const products = await getProducts();
  return {props: {products, prdData: prdData}};
}

export default Home;
