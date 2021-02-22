import Link from "next/link";

const Payment = () => {
  return (
    <div>
      Here is Payment Page content <br />
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

export default Payment;
