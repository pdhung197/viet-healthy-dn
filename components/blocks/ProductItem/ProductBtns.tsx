import {v4 as uuidv4} from "uuid";
import {MinusOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {useMutation} from "@apollo/client";
import {FaCartPlus} from "react-icons/fa";
import {useProducts} from "../../../hooks/useProducts/useProducts";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductDataItem} from "../../../models/Product";
import {addProductToCart} from "../../../services/cartSv/cartMutate";
import {useState} from "react";
import {ReturnData} from "../../../models/Common";

type AddRemoveCartProps = {
  product: ProductDataItem;
};

export const ProductBtns = ({product}: AddRemoveCartProps) => {
  const {t} = useTranslation();

  const [isProcessing, setIsProcessing] = useState(false);

  const {handleIncreaseOrDecrease, onCountChange, countToCart} = useProducts();

  const handleAddToCart = async () => {
    setIsProcessing(true);
    const processingResult: ReturnData = await addProductToCart(
      product,
      countToCart
    );
    setIsProcessing(false);
  };

  return (
    <>
      <div>
        <button
          className="product-card__prod-btns--sub"
          value={-1}
          onClick={handleIncreaseOrDecrease}
        >
          <MinusOutlined />
        </button>
        <input
          className="product-card__prod-btns--count"
          value={countToCart}
          onChange={onCountChange}
          pattern="^[0–9]$"
        />
        <button
          value={1}
          className="product-card__prod-btns--add"
          onClick={handleIncreaseOrDecrease}
        >
          <PlusOutlined />
        </button>
      </div>
      <div>
        <button
          value="addToCart"
          onClick={handleAddToCart}
          className="product-card__prod-btns--add-to-cart"
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
