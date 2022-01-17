import { useRouter } from "next/router";
import { Container } from "../../components/blocks/Containers/Container";
import { ViewDoiDiem } from "../../components/views/DoiDiem/ViewDoiDiem";

type DoiDiemProps = {
  current: string;
};

const DoiDiem = ({ current }: DoiDiemProps) => {
  const router = useRouter();
  const isOverDate =
    new Date(current).getMonth() > 1 || new Date(current).getDate() > 25;
  if (isOverDate) {
    router.push("/products");
  }

  return (
    <Container>
      <ViewDoiDiem current={current} />
    </Container>
  );
};

export async function getServerSideProps() {
  const current = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  return {
    props: {
      current,
    },
  };
}

export default DoiDiem;
