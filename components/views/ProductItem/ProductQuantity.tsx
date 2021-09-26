import React from "react";
import {HiMinusSm, HiPlus} from "react-icons/hi";

type ProductQuantityProps = {
  className?: string;
  handleAdjustBtnClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleAdjustInputChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  quantity?: number;
};

export const ProductQuantity = ({
  className = "product-card",
  handleAdjustBtnClick = () => {},
  handleAdjustInputChange = () => {},
  isLoading = false,
  quantity = 1,
}: ProductQuantityProps) => {
  return (
    <div className={`${className}__prod-btns--adjust-group`}>
      <button
        className={`${className}__prod-btns--sub`}
        value={-1}
        onClick={handleAdjustBtnClick}
        disabled={isLoading}
      >
        <HiMinusSm />
      </button>
      <input
        className={`${className}__prod-btns--count`}
        value={quantity}
        onChange={handleAdjustInputChange}
        pattern="^[0–9]$"
        disabled={isLoading}
      />
      <button
        value={1}
        className={`${className}__prod-btns--add`}
        onClick={handleAdjustBtnClick}
        disabled={isLoading}
      >
        <HiPlus />
      </button>
    </div>
  );
};
