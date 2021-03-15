import {gql} from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      clientMutationId
    }
  }
`;
