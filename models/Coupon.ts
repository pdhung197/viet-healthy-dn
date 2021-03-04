export interface Coupon {
  id: string;
  couponId: string;
  discountType: string;
  amount: string;
  dateExpiry: string;
  products: {
    nodes: string[];
  };
  productCategories: {
    nodes: string[];
  };
}
