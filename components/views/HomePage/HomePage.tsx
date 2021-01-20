import {Button} from "antd";
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
      <Button type="primary">Primary Button</Button>
    </div>
  );
};
