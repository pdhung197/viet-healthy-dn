import "../assets/styles/antd-custom.less";
import {Wrapper} from "../components/views/Wrapper/Wrapper";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Router} from "next/router";
import NProgress from "nprogress"; //nprogress module

import "nprogress/nprogress.css"; //styles of nprogress

import client from "../utils/ApolloClient";
import {ApolloProvider} from "@apollo/client";

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

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </ApolloProvider>
  );
};

/* MyApp.getInitialProps = async () => {
  return {pageProps: {ser: "Server side fetch"}};
}; */

export default MyApp;
