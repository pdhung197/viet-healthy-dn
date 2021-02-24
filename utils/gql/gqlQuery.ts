import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery {
    products(first: 1000) {
      nodes {
        productCategories {
          nodes {
            name
            slug
          }
        }
        name
        sku
        slug
        status
        totalSales
        databaseId
        date
        dateOnSaleFrom
        dateOnSaleTo
        description(format: RAW)
        featured
      }
    }
  }
`;
