import Link from "next/link";

export const HomePage = () => {
  return (
    <div>
      Home Page
      <br />
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <br />
    </div>
  );
};
