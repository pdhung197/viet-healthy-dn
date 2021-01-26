import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      Here is Admin Page content <br />
      <Link href={`/admin/${(Math.random() * 100).toFixed(0)}`}>
        <a>Another link</a>
      </Link>
      <br />
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

export default AdminPage;
