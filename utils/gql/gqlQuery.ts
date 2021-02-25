import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery($after: String, $first: Int, $categoryIn: [String]) {
    products(first: $first, after: $after, where: {categoryIn: $categoryIn}) {
      nodes {
        id
        image {
          sourceUrl
        }
        name
        onSale
        productCategories {
          nodes {
            slug
          }
        }
        productTags {
          nodes {
            slug
          }
        }
        sku
        status
        totalSales
        type
        visibleProducts {
          nodes {
            slug
            isRestricted
          }
        }
        ... on VariableProduct {
          manageStock
          onSale
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          soldIndividually
          weight
          width
        }
        ... on ExternalProduct {
          onSale
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
        }
        ... on SimpleProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          virtual
          weight
          width
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
