import {HomePage} from "../components/views/HomePage/HomePage";
import {HomeProps} from "../models/PageProps";
import {getProducts} from "../services/mocks/getProducts";
import client from "../utils/ApolloClient";
import {FETCH_ALL_PRODUCTS_QUERY} from "../utils/gql/gqlQuery";

const Home = (props: HomeProps) => {
  console.log({prd: props.prdData});
  return <HomePage {...props} />;
};

export async function getStaticProps() {
  const {data} = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  const products = await getProducts();
  return {props: {products, prdData: data.products}};
}

export default Home;
