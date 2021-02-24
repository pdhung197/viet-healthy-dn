import {gql} from "@apollo/client";

export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery {
    products(first: 100) {
      nodes {
        id
        name
        link
        status
        slug
        description
      }
    }
  }
`;
