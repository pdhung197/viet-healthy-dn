import Link from "next/link";

const ProductDetail = () => {
  return (
    <div>
      Here is Product Detail Page content <br />
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

export default ProductDetail;
