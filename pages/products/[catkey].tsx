import Link from "next/link";

const CatProdList = () => {
  return (
    <div>
      Here is Category Product list Page content <br />
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

export default CatProdList;
