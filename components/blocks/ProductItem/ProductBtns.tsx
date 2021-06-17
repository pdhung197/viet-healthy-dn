import {MinusOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {FaCartPlus} from "react-icons/fa";
import {useProducts} from "../../../hooks/useProducts/useProducts";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductDataItem, ProductInfo} from "../../../models/Product";

type AddRemoveCartProps = {
  product: ProductInfo;
};

export const ProductBtns = ({product}: AddRemoveCartProps) => {
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
    <>
      <div>
        <button
          className="product-card__prod-btns--sub"
          value={-1}
          onClick={handleIncreaseOrDecrease}
          disabled={isProcessing}
        >
          <MinusOutlined />
        </button>
        <input
          className="product-card__prod-btns--count"
          value={countToCart}
          onChange={onCountChange}
          pattern="^[0–9]$"
          disabled={isProcessing}
        />
        <button
          value={1}
          className="product-card__prod-btns--add"
          onClick={handleIncreaseOrDecrease}
          disabled={isProcessing}
        >
          <PlusOutlined />
        </button>
      </div>
      <div>
        <button
          value="addToCart"
          onClick={handleAddToCart}
          className="product-card__prod-btns--add-to-cart"
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
    </>
  );
};
