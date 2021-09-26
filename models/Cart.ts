import {PayMethods} from "./Customer";
import {ProductDataItem, ProductInfo} from "./Product";
export type CartActionType = "add" | "remove" | "buynow";

export enum CartsStore {
  name = "carts",
}

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

export interface CartItem extends ProductInfo {
  quantity: number;
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

export enum CartColumnKey {
  name = "name",
  price = "price",
  quantity = "quantity",
}

export interface OrderRequest {
  payment_method: PayMethods;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: "";
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: {
    product_id: string | number;
    quantity: number;
    variation_id?: string | number;
  }[];
  shipping_lines: [
    {
      method_id: string;
      method_title: string;
      total: string;
    }
  ];
}
