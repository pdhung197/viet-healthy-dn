export interface CategoryParams {
  context?: string;
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: (string | number)[];
  include?: (string | number)[];
  order?: string;
  orderby?: string;
  hide_empty?: boolean;
  parent?: number;
  product?: number;
  slug?: string;
}

export interface CategoryInfo {
  id: string | number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: string[];
  menu_order: number;
  count: number;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    up: {
      href: string;
    }[];
  };
}
