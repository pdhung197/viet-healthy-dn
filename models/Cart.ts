import {ProductBase, ProductDataItem} from "./Product";
export type CartActionType = "add" | "remove" | "buynow";

export interface CartVariantation {
  id: string;
  variationId: string;
  name: string;
  description: string;
  type: string;
  onSale: boolean;
  price: string;
  regularPrice: string;
  salePrice: string;
  image: {
    id: string;
    sourceUrl: string;
    srcSet: string[];
    altText: string;
    title: string;
  }[];
  attributes: {
    nodes: {
      id: string;
      name: string;
      value: string;
    }[];
  };
}

export interface CartContent {
  key: string;
  product: Partial<ProductDataItem>;
  variation: CartVariantation;
  quantity: number;
  total: number;
  subtotal: number;
  subtotalTax: number;
}

export interface CartData {
  content: {
    nodes: CartContent[];
  };
  subtotal: string;
  subtotalTax: string;
  total: string;
  totalTax: string;
}

export interface CartItem extends ProductBase {
  count: number;
}

export interface CartDataContext {
  content: Partial<ProductDataItem>[];
  subtotal: number;
  subtotalTax: number;
  total: number;
  totalTax: number;
  shippingTax: number;
  shippingTotal: number;
  feeTax: number;
  feeTotal: number;
  discountTax: number;
  discountTotal: number;
}
