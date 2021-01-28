import Link from "next/link";
import {HomeProps} from "../../../models/PageProps";

export const HomePage = (props: HomeProps) => {
  const {products} = props;
  console.log({products});
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
