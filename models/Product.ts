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

export interface ProductParams {
  context?: string;
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  before?: string;
  exclude?: any[];
  include?: any[];
  offset?: number;
  order?: string;
  orderby?: string;
  parent?: any[];
  parent_exclude?: any[];
  slug?: string;
  status?: string;
  type?: string;
  sku?: string;
  featured?: boolean;
  category?: string;
  tag?: string;
  shipping_class?: string;
  attribute?: string;
  attribute_term?: string;
  tax_class?: string;
  on_sale?: boolean;
  min_price?: string;
  max_price?: string;
  stock_status?: string;
}

export interface ProductInfo {
  id: string | number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: null;
  stock_status: string;
  backorders: "no" | "yes" | "NO" | "YES";
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: number;
  rating_count: number;
  related_ids: (string | number)[];
  upsell_ids: (string | number)[];
  cross_sell_ids: (string | number)[];
  parent_id: string | number;
  purchase_note: string;
  categories: {
    id: string | number;
    name: string;
    slug: string;
  }[];
  tags: string[];
  images: {
    id: string | number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  }[];
  attributes: {
    id: string | number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  default_attributes: {
    id: string | number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  variations: string[];
  grouped_products: string[];
  menu_order: number;
  meta_data: string[];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}

export type ProductListByCatInfo = {
  [key in string]: {
    catId: string | number;
    catName: string;
    catSlug: string;
    products: ProductInfo[];
  };
};

export type ProductInCart = {
  id: string | number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: {
    id: string | number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  }[];
  variations: string[];
  quantity: number;
};
