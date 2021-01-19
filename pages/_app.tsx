import "antd/dist/antd.css";
import "../styles/vars.scss";
import "../styles/global.scss";

type AppProps = {
  Component: React.FunctionComponent;
  pageProps: any;
};

export default function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
