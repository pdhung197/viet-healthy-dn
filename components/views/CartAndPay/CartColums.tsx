import {Col, Row} from "antd";
import React from "react";
import {TableColumn} from "../../../models/Common";
import {ProductInCart} from "../../../models/Product";
import {ProductBtns} from "../../blocks/ProductItem/ProductBtns";
import {ProductPrice} from "../../blocks/ProductItem/ProductPrice";

const ProductCol = ({cartItem}: {cartItem: ProductInCart}) => {
  const {quantity, ...product} = cartItem;
  const {name, images} = product;

  return (
    <div className="cart-cell__product">
      <div className="cart-cell__product-img">
        <img
          src={
            !images ||
            !images.length ||
            !images[0] ||
            images[0].src.includes("woocommerce-placeholder")
              ? `${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`
              : images[0].src
          }
          alt={name}
        />
      </div>
      <div className="cart-cell__detail">
        <Row>
          <Col xs={{span: 24}} className="cart-cell__detail__name">
            <h2>{name}</h2>
          </Col>
          <Col
            className="cart-cell__detail__btn"
            md={{span: 0}}
            sm={{span: 24}}
          >
            <ProductPrice className="cart-cell__detail" product={product} />
            <ProductBtns
              defaultCount={quantity}
              className="cart-cell__detail"
              product={product}
              btns={["remove"]}
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
      const {quantity, ...product} = cartItem;
      return <ProductPrice className="cart-cell__detail" product={product} />;
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    render: (text: string, cartItem: ProductInCart) => {
      const {quantity, ...product} = cartItem;
      return (
        <ProductBtns
          defaultCount={quantity}
          className="cart-cell__detail"
          product={product}
        />
      );
    },
  },
];
