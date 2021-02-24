import Link from "next/link";
import {HomeProps} from "../../../models/PageProps";
import { HomeCarousel } from "../../blocks/Carousels/HomeCarousel";

export const HomePage = (props: HomeProps) => {
  const {products} = props;
  console.log({products});
  return (
    <div>
      <HomeCarousel/>
      <br />
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <br />
    </div>
  );
};
