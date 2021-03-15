import {GRAPHQL_URL} from "./apiConfig";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

export const middleware = new ApolloLink((operation, forward) => {
  const session = process.browser ? localStorage.getItem("woo-session") : null;
  const sessionAge = process.browser
    ? localStorage.getItem("woo-session-expiry")
    : null;
  const todaysDate = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const olderThan24h =
    Math.abs(
      new Date(todaysDate).getTime() - new Date(sessionAge || 0).getTime()
    ) > oneDay
      ? 1
      : 0;

  if (olderThan24h && process.browser) {
    localStorage.removeItem("woo-session");
    localStorage.removeItem("woo-session-expiry");
  }
  if (session) {
    operation.setContext(({headers = {}}) => ({
      headers: {
        "woocommerce-session": `Session ${session}`,
      },
    }));
  }
  return forward(operation);
});

export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: {headers},
    } = context;

    const session = headers.get("woocommerce-session");

    if (session && process.browser) {
      if ("false" === session) {
        localStorage.removeItem("woo-session");
      } else if (localStorage.getItem("woo-session") !== session) {
        localStorage.setItem("woo-session", headers.get("woocommerce-session"));
        localStorage.setItem("woo-session-expiry", new Date().toISOString());
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        uri: GRAPHQL_URL,
        fetch: fetch /* 
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": true,
        }, */,
      })
    )
  ),

  cache: new InMemoryCache(),
});

export default client;
