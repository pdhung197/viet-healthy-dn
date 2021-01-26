import {HomePage} from "../components/views/HomePage/HomePage";
import {getProducts} from "../services/mocks/getProducts";

type HomeProps = {
  homeData: string;
};

const Home = (props: HomeProps) => {
  console.log({props});
  return <HomePage />;
};

export async function getStaticProps() {
  const products = await getProducts();
  console.log({products});
  return {props: {products}};
}

export default Home;
