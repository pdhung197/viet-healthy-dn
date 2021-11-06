import { Col, Row } from "antd";
import React from "react";
import { getProductImage } from "../../../helpers/productsFnc";
import { TableColumn } from "../../../models/Common";
import { ProductInCart } from "../../../models/Product";
import { ProductBtns } from "../ProductItem/ProductBtns";
import { ProductPrice } from "../ProductItem/ProductPrice";
import { CartQuantityUpdate } from "./CartQuantityUpdate";

const ProductCol = ({ cartItem }: { cartItem: ProductInCart }) => {
  const { quantity, ...product } = cartItem;
  const { name, images } = product;

  return (
    <div className="cart-cell__product">
      <div className="cart-cell__product-img">
        <img src={getProductImage(product)} alt={name} />
      </div>
      <div className="cart-cell__detail">
        <Row>
          <Col xs={{ span: 24 }} className="cart-cell__detail__name">
            <h2>{name}</h2>
          </Col>
          <Col
            className="cart-cell__detail__btn"
            md={{ span: 0 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <ProductPrice className="cart-cell__detail" product={product} />
            <CartQuantityUpdate product={cartItem} />
            <ProductBtns
              product={product}
              btns={["remove"]}
              className="cart-cell__detail"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const cartColumns: TableColumn[] = [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
    render: (text: string, cartItem: ProductInCart) => (
      <ProductCol cartItem={cartItem} />
    ),
    align: "center",
  },
];

export const cartColumnsDesktop: TableColumn[] = [
  {
    title: "Đơn giá",
    dataIndex: "price",
    key: "price",
    render: (text: string, cartItem: ProductInCart) => {
      const { quantity, ...product } = cartItem;
      return <ProductPrice className="cart-cell__detail" product={product} />;
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    render: (text: string, cartItem: ProductInCart) => (
      <CartQuantityUpdate product={cartItem} />
    ),
  },
];
