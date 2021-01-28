import "../assets/styles/antd-custom.less";
import {Wrapper} from "../components/views/Wrapper/Wrapper";
import {createGlobalStyle, ThemeProvider} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {};

type AppProps = {
  Component: React.FunctionComponent;
  pageProps: any;
};

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

/* MyApp.getInitialProps = async () => {
  return {pageProps: {ser: "Server side fetch"}};
}; */

export default MyApp;
