import "../assets/styles/antd-custom.less";
import {Wrapper} from "../components/views/Wrapper/Wrapper";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Router} from "next/router";
import NProgress from "nprogress"; //nprogress module

import "./../assets/styles/style.scss";
import "nprogress/nprogress.css"; //styles of nprogress

import client from "../utils/ApolloClient";
import {ApolloProvider} from "@apollo/client";
import {useEffect} from "react";

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
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done());
      Router.events.off("routeChangeError", () => NProgress.done());
    };
  }, [Router]);

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
