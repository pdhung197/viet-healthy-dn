import Link from "next/link";

const Contact = () => {
  return (
    <div>
      Here is Contact Page content <br />
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

export default Contact;
