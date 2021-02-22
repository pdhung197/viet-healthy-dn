import {ProductBase} from "./Product";
export type CartActionType = "add" | "remove";

export interface CartItem extends ProductBase {
  count: number;
}
