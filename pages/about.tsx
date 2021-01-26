import Link from "next/link";

const About = () => {
  return (
    <div>
      Here is About Page content <br />
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

export default About;
