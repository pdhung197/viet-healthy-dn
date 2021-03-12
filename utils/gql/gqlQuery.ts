import {gql} from "@apollo/client";

export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query FETCH_ALL_PRODUCTS_QUERY(
    $after: String
    $first: Int
    $categoryIn: [String]
  ) {
    products(first: $first, after: $after, where: {categoryIn: $categoryIn}) {
      nodes {
        databaseId
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
          stockQuantity
          stockStatus
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
          stockQuantity
          stockStatus
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
          }
          variation {
            attributes {
              id
              name
              value
            }
            node {
              id
              databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        nodes {
          id
          databaseId
          discountType
          amount
          dateExpiry
          products {
            nodes {
              id
            }
          }
          productCategories {
            nodes {
              id
            }
          }
        }
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

export const GET_PRODUCT_INFO = gql`
  query GET_PRODUCT_INFO($productId: ID!) {
    product(id: $productId) {
      id
      date
      databaseId
      dateOnSaleFrom
      dateOnSaleTo
      description(format: RAW)
      featured
      image {
        sourceUrl
      }
      name
      onSale
      purchasable
      purchaseNote
      reviewCount
      sku
      slug
      status
      totalSales
      type
      galleryImages {
        nodes {
          sourceUrl
        }
      }
      visibleProducts {
        nodes {
          isRestricted
          count
          description
        }
      }
      ... on VariableProduct {
        stockQuantity
        stockStatus
        onSale
        status
        soldIndividually
      }
      ... on SimpleProduct {
        onSale
        stockQuantity
        status
        soldIndividually
        stockStatus
        totalSales
        salePrice(format: RAW)
        regularPrice(format: RAW)
        price(format: RAW)
        purchasable
        purchaseNote
        manageStock
        isRestricted
        isPreview
      }
      ... on ExternalProduct {
        price(format: RAW)
        regularPrice(format: RAW)
        salePrice(format: RAW)
        onSale
        isRestricted
      }
    }
  }
`;
