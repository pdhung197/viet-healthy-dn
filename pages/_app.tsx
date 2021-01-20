import "antd/dist/antd.css";
import "../styles/vars.scss";
import "../styles/global.scss";
import {Wrapper} from "../components/views/Wrapper/Wrapper";

type AppProps = {
  Component: React.FunctionComponent;
  pageProps: any;
};

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}
