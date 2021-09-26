import React from "react";
import {useCart} from "../../../hooks/useCart/useCart";
import {ProductInCart} from "../../../models/Product";
import {ProductQuantity} from "../ProductItem/ProductQuantity";

type CartQuantityUpdateProps = {
  product: ProductInCart;
};

export const CartQuantityUpdate = ({product}: CartQuantityUpdateProps) => {
  const {updateProductInCart} = useCart();

  const handleUpdateQuantity = (quantity: number) => {
    return updateProductInCart({
      ...product,
      quantity,
    });
  };

  const handleIncreaseOrDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const count: number = parseInt(e.currentTarget.value);
    let updateCount = 0;
    if (count + product.quantity > 0) {
      updateCount = count + product.quantity;
    }

    handleUpdateQuantity(updateCount);
  };

  const handleCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const count: number = parseInt(e.currentTarget.value);

    let updateCount = 0;
    if (count > 0) {
      updateCount = count;
    }

    if (updateCount === product.quantity) {
      return;
    }

    handleUpdateQuantity(updateCount);
  };

  return (
    <ProductQuantity
      className="cart-cell__detail"
      quantity={product.quantity}
      handleAdjustBtnClick={handleIncreaseOrDecrease}
      handleAdjustInputChange={handleCountChange}
    />
  );
};
