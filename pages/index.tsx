import {HomePage} from "../components/views/HomePage/HomePage";
import {HomeProps} from "../models/PageProps";
import {getProducts} from "../services/mocks/getProducts";
import {getAllProduct} from "../services/productsSv/productQuery";
import {fetchAllProducts} from "../services/apis/productApis";

const Home = (props: HomeProps) => {
  console.log({p: props.prdsData});
  return <HomePage {...props} />;
};

export async function getStaticProps() {
  const prdsData = await fetchAllProducts();
  console.log({prdsData});
  const products = await getProducts();
  return {props: {products, prdData: [], prdsData}};
}

export default Home;
