import {HomePage} from "../components/views/HomePage/HomePage";
import {HomeProps} from "../models/PageProps";
import {getProducts} from "../services/mocks/getProducts";

const Home = (props: HomeProps) => {
  return <HomePage {...props} />;
};

export async function getStaticProps() {
  const products = await getProducts();
  return {props: {products}};
}

export default Home;
