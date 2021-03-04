import {Params} from "next/dist/next-server/server/router";
import Link from "next/link";
import {ProductsView} from "../../components/views/ProductView/ProductsView";
import {prodCats, ProdCatType} from "../../mocks/prodCats";
import {CatProdListProps} from "../../models/PageProps";
import {getProducts} from "../../services/mocks/getProducts";
import {getAllProduct} from "../../services/productsSv/productQuery";

const CatProdList = (props: CatProdListProps) => {
  return (
    <>
      <ProductsView {...props} />
      <br />
      <Link href="/admin">
        <a>Admin page</a>
      </Link>
    </>
  );
};

export async function getStaticPaths() {
  const paths = prodCats.map((prodCat: ProdCatType) => ({
    params: {catkey: prodCat.key},
  }));
  paths.push({params: {catkey: "all"}});

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}: Params) {
  const prdData = await getAllProduct(
    params.catkey === "all" ? undefined : params.catkey
  );

  const products = await getProducts(
    params.catkey === "all" ? undefined : params.catkey
  );
  return {props: {products, prdData}};
}

export default CatProdList;
