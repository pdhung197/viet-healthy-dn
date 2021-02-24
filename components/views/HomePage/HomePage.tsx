import Link from "next/link";
import {HomeProps} from "../../../models/PageProps";
import {ProductCarousel} from "../../blocks/Carousels/ProductCarousel";

export const HomePage = (props: HomeProps) => {
  const {products} = props;

  return (
    <div>
      <ProductCarousel />
      <br />
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <br />
    </div>
  );
};
