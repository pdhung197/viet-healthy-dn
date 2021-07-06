import {GetServerSideProps} from "next";
import Link from "next/link";
import {ProductDetail} from "../../components/views/ProductView/ProductDetail";
import {ProductInfo} from "../../models/Product";
import {fetchProductData} from "../../services/apis/productApis";

type ProductDetailProps = {
  productInfo: ProductInfo;
};

const ProductDetailPage = ({productInfo}: ProductDetailProps) => {
  if (!productInfo) {
    return null;
  }

  return <ProductDetail product={productInfo} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query: {pid = ""} = {}} = context;

  const productInfo = await fetchProductData(
    typeof pid === "string" ? pid : pid[0]
  );

  return {props: {productInfo}};
};

export default ProductDetailPage;
