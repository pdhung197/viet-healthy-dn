export interface CustomerCreateInfo {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
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
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}

export interface CustomerInfo extends CustomerCreateInfo {
  id: string | number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  role: string;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: [];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}

export type PayMethods = "bacs" | "cod" | "paypal";

export interface CustomerInputs {
  name: string;
  email?: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note: string;
}

export type AreaData = {
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path?: string;
  path_with_type?: string;
  code: string;
  parent_code?: string;
};

export type AreasData = {
  [key in string]: AreaData;
};

export interface CustomerScoreData {
  index: string;
  name: string;
  phone: string;
  location?: string;
  totalBuy: string;
  totalOrder: string;
  lastOrder: string;
  totalScore: string;
  coupon: string;
}
