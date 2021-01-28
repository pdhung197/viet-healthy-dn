import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../../contexts/userContext/userContext";
import {ProductBase} from "../../models/Product";
import {getProducts} from "../../services/mocks/getProducts";

type ProductsProps = {
  products: ProductBase[][];
};

const Products = (props: ProductsProps) => {
  const {products} = props;
  console.log({products});

  return (
    <div>
      Here is All Product list Page content <br />
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <Link href="/admin">
        <a>Admin page</a>
      </Link>
    </div>
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  return {props: {products}};
}

export default Products;
