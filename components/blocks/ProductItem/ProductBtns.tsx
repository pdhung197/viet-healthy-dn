import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {CartActionType} from "../../../models/Cart";
import {ProductBase, ProductDataItem} from "../../../models/Product";

type AddRemoveCartProps = {
  product: ProductDataItem;
  handleAddRemoveCart: (
    cartAction: CartActionType,
    product: ProductDataItem
  ) => void;
  countInCart: number;
};

export const ProductBtns = ({
  product,
  handleAddRemoveCart,
  countInCart,
}: AddRemoveCartProps) => {
  const {t} = useTranslation();
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => handleAddRemoveCart(e.currentTarget.value as CartActionType, product);

  return (
    <>
      <div>
        <button
          className="product-card__prod-btns--sub"
          value="remove"
          onClick={handleButtonClick}
        >
          <MinusOutlined />
        </button>
        <button disabled={true} className="product-card__prod-btns--count">
          {countInCart}
        </button>
        <button
          value="add"
          className="product-card__prod-btns--add"
          onClick={handleButtonClick}
        >
          <PlusOutlined />
        </button>
      </div>
      <div>
        <button
          value="buynow"
          onClick={handleButtonClick}
          className="product-card__prod-btns--pay"
        >
          {t("common.route.buyNow")}
        </button>
      </div>
    </>
  );
};
