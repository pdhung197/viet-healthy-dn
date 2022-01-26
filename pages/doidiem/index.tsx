import { Container } from "../../components/blocks/Containers/Container";
import { ViewDoiDiem } from "../../components/views/DoiDiem/ViewDoiDiem";

type DoiDiemProps = {
  current: string;
};

const DoiDiem = ({ current }: DoiDiemProps) => {
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
