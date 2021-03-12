import {v4 as uuidv4} from "uuid";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useMutation} from "@apollo/client";
import {FaCartPlus} from "react-icons/fa";
import {useProducts} from "../../../hooks/useProducts/useProducts";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductDataItem} from "../../../models/Product";
import {ADD_TO_CART} from "../../../utils/gql/gqlMutation";

type AddRemoveCartProps = {
  product: ProductDataItem;
};

export const ProductBtns = ({product}: AddRemoveCartProps) => {
  const {t} = useTranslation();

  const {handleIncreaseOrDecrease, onCountChange, countToCart} = useProducts();

  const productQueryInput = {
    clientMutationId: uuidv4(), // Generate a unique id.
    productId: product.id,
  };

  const [addToCart, {loading, error}] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      if (error) {
        console.log(error.graphQLErrors[0].message);
      }
    },
    onError: (error) => {
      if (error) {
        console.log(error);
      }
    },
  });

  const handleAddToCart = () => {
    console.log("Fire");
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
          <FaCartPlus size="1.2em" />
          {t("pageData.product.addToCart")}
        </button>
      </div>
    </>
  );
};
