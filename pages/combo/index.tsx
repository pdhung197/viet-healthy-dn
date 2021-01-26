import Link from "next/link";

const Combo = () => {
  return (
    <div>
      Here is Combo Page content <br />
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

export default Combo;
