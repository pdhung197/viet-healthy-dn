import Link from "next/link";

const Admin = () => {
  return (
    <div>
      Admin Page
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/admin/abc">
        <a>Another admin page</a>
      </Link>
    </div>
  );
};

export default Admin;
