export type StockStatusType = "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";

export interface ProductBase {
  id: string | number;
  name: string;
  images: string[];
  catKey: string;
  price: number;
  discount?: number;
}

export interface ProductBaseItem {
  databaseId: string;
  id: string;
  image: {
    sourceUrl?: string;
  };
  name: string;
  onSale: boolean;
  productCategories: {
    nodes: {
      slug?: string;
    }[];
  };
  productTags: {
    nodes: {
      slug?: string;
    }[];
  };
  sku: string;
  status: string;
  totalSales: number;
  type: string;
  visibleProducts: {
    nodes: {
      slug?: string;
      isRestricted?: boolean;
    }[];
  };
  manageStock?: number;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  soldIndividually?: string;
  weight?: string;
  width?: string;
  virtual?: string;
  stockQuantity?: Number;
  stockStatus?: StockStatusType;
}

export interface ProductDataItem {
  databaseId: string;
  id: string;
  image: string | null;
  name: string;
  onSale: boolean;
  productCategories: (string | undefined)[];
  productTags: (string | undefined)[];
  sku: string;
  status: string;
  totalSales: number;
  type: string;
  visibleProducts: {
    slug?: string;
    isRestricted?: boolean;
  }[];
  manageStock?: number;
  price?: number;
  regularPrice?: number;
  salePrice?: number;
  soldIndividually?: string;
  weight?: number;
  width?: number;
  virtual?: string;
  stockQuantity?: Number;
  stockStatus?: StockStatusType;
}
