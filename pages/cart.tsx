import Link from "next/link";

const Cart = () => {
  return (
    <div>
      Here is Cart Page content <br />
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

export default Cart;
