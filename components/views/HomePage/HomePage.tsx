import Link from "next/link";

export const HomePage = () => {
  return (
    <div>
      Home Page
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    </div>
  );
};
