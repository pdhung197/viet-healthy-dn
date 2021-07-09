import {useRouter} from "next/router";
import React, {ReactNode, useContext} from "react";
import styled from "styled-components";
import {UserContext} from "../../../contexts/userContext/userContext";
import {ProductInfo} from "../../../models/Product";

const LinkInside = styled.div`
  cursor: pointer;
`;

type RouteLinkProps = {
  children: ReactNode;
  product: ProductInfo;
  shallow?: boolean;
};

export const ProductLink = ({children, product}: RouteLinkProps) => {
  const router = useRouter();
  const {storeProductDetail} = useContext(UserContext);
  const {id, slug} = product;

  const handleProductLink = () => {
    storeProductDetail(product);

    router.push(`/products?pid=${id}`, `/products/${slug}`, {
      shallow: true,
    });
  };

  return <LinkInside onClick={handleProductLink}>{children}</LinkInside>;
};
