import "../styles/antd-custom.less";
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
