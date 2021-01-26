import Link from "next/link";

const Products = () => {
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

export default Products;
