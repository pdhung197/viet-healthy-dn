import Link from "next/link";
import {ComboProps} from "../../models/PageProps";
import {getCombos} from "../../services/mocks/getCombos";

const Combo = (props: ComboProps) => {
  const {combos} = props;

  return (
    <div>
      Here is Combo Page content <br />
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

export async function getStaticProps() {
  const combos = await getCombos();
  return {props: {combos}};
}

export default Combo;
