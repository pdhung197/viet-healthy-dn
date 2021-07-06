import {ReloadOutlined} from "@ant-design/icons";
import {FaCartPlus} from "react-icons/fa";
import {HiMinusSm, HiPlus} from "react-icons/hi";
import {useProducts} from "../../../hooks/useProducts/useProducts";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductDataItem, ProductInfo} from "../../../models/Product";

type AddRemoveCartProps = {
  product: ProductInfo;
  className?: string;
};

export const ProductBtns = ({
  product,
  className = "product-card",
}: AddRemoveCartProps) => {
  const {t} = useTranslation();

  const {
    handleIncreaseOrDecrease,
    onCountChange,
    countToCart,
    isProcessing,
    addProductToCart,
  } = useProducts();

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  return (
    <div className={`${className}__prod-btns`}>
      <div>
        <button
          className={`${className}__prod-btns--sub`}
          value={-1}
          onClick={handleIncreaseOrDecrease}
          disabled={isProcessing}
        >
          <HiMinusSm />
        </button>
        <input
          className={`${className}__prod-btns--count`}
          value={countToCart}
          onChange={onCountChange}
          pattern="^[0–9]$"
          disabled={isProcessing}
        />
        <button
          value={1}
          className={`${className}__prod-btns--add`}
          onClick={handleIncreaseOrDecrease}
          disabled={isProcessing}
        >
          <HiPlus />
        </button>
      </div>
      <div>
        <button
          value="addToCart"
          onClick={handleAddToCart}
          className={`${className}__prod-btns--add-to-cart`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ReloadOutlined spin={true} />
          ) : (
            <FaCartPlus size="1.2em" />
          )}
          <span>{t("pageData.product.addToCart")}</span>
        </button>
      </div>
    </div>
  );
};
