import React, { useContext, useState } from "react";
import { Form } from "antd";
import {
  AreasData,
  CustomerCreateInfo,
  CustomerInfo,
  CustomerInputs,
  PayMethods,
} from "../../models/Customer";

import provinceData from "./../../localize/local-data/provinces.json";
import districtData from "./../../localize/local-data/districts.json";
import { useEffect } from "react";
import { SelectData } from "../../models/Common";
import { FormInstance } from "antd/lib/form";
import { UserContext } from "../../contexts/userContext/userContext";
import { ProductInCart } from "../../models/Product";
import { OrderRequest } from "../../models/Cart";
import { submitNewOrder } from "../../services/apis/orderApis";
import NProgress from "nprogress"; //nprogress module
import {
  createNewCustomer,
  getCustomerByPhone,
} from "../../services/apis/customerApis";
import { debounce } from "../../helpers/common";

const getWardData = (wardNumber: string) =>
  import(`./../../localize/local-data/wards/${wardNumber}.json`).then(
    (module) => module.default
  );

const payMethods: {
  [key in string]: string;
} = {
  bacs: "Chuyển khoản ngân hàng",
  cod: "Thanh toán khi nhận hàng",
  paypal: "Thanh toán PayPal",
};

const initialCustomer: CustomerInputs = {
  name: "",
  email: "",
  phone: "",
  province: "",
  district: "",
  ward: "",
  address: "",
  note: "",
};

export interface CustomerForm {
  form: FormInstance<any>;
  customer: CustomerInputs;
  payMethod: PayMethods;
  updatePayMethod: (method: PayMethods) => void;
  onCustomerInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  getExistsCustomer: () => Promise<any>;
  provinces: SelectData[];
  districts: SelectData[];
  wards: SelectData[];
  onFormSubmit: () => Promise<any>;
  isLoading: boolean;
}

export const useCustomer = (): CustomerForm => {
  const [form] = Form.useForm();
  const { carts, updateCartToContextAndLocalStorage } = useContext(UserContext);
  const [existsCustomer, setExistsCustomer] = useState<CustomerInfo | null>(
    null
  );
  const [payMethod, setPayMethod] = useState<PayMethods>("bacs");
  const [customer, setCustomer] = useState<CustomerInputs>(initialCustomer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const provinces = (): SelectData[] => {
    return Object.keys(provinceData).map((key: string) => ({
      label: (provinceData as AreasData)[key].name,
      value: (provinceData as AreasData)[key].code,
    }));
  };

  const [provinceList] = useState<SelectData[]>(provinces());
  const [districtList, setDistrictList] = useState<SelectData[]>([]);
  const [wardList, setWardList] = useState<SelectData[]>([]);

  useEffect(() => {
    if (!customer.province || !customer.province.length) {
      return;
    }

    const newDistrictList = Object.keys(districtData).reduce(
      (districts: SelectData[], key: string) => {
        if (
          (districtData as AreasData)[key].parent_code === customer.province
        ) {
          return [
            ...districts,
            {
              label: (districtData as AreasData)[key].name,
              value: (districtData as AreasData)[key].code,
              fullLabel: (districtData as AreasData)[key].path_with_type,
            },
          ];
        }

        return districts;
      },
      []
    );

    setDistrictList(newDistrictList);
  }, [customer.province]);

  useEffect(() => {
    if (!customer.district || !customer.district.length) {
      return;
    }

    const retryNewWardList = async () => {
      const wardList = await getWardData(customer.district);
      const wardArray = Object.keys(wardList).reduce(
        (wards: SelectData[], key: string) => {
          if ((wardList as AreasData)[key].parent_code === customer.district) {
            return [
              ...wards,
              {
                label: (wardList as AreasData)[key].name,
                value: (wardList as AreasData)[key].code,
                fullLabel: (wardList as AreasData)[key].path_with_type,
              },
            ];
          }

          return wards;
        },
        []
      );

      setWardList(wardArray);
    };

    retryNewWardList();
  }, [customer.district]);

  const updatePayMethod = (method: PayMethods) => {
    setPayMethod(method);
  };

  const onCustomerInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const currentTarget = e.target;

    if (!currentTarget) {
      return;
    }

    const { name = "", value = "" } = currentTarget;

    if (!name || !name.length) {
      return;
    }

    if (name === "province") {
      form.setFieldsValue({
        ward: "",
        district: "",
      });
      setCustomer({
        ...customer,
        province: value,
        district: "",
        ward: "",
      });
      setDistrictList([]);
      setWardList([]);
    } else if (name === "district") {
      form.setFieldsValue({
        ward: "",
      });
      setCustomer({
        ...customer,
        district: value,
        ward: "",
      });
      setWardList([]);
    } else {
      setCustomer({
        ...customer,
        [name]: value,
      });
    }
  };

  const addNewCustomer = (newCustomer: CustomerCreateInfo) => {
    return createNewCustomer(newCustomer);
  };

  const getExistsCustomer = async () => {
    try {
      const fakeEmailByPhone = `email_${customer.phone}@email.com`;

      const existsCustomerInfo: CustomerInfo | null = await getCustomerByPhone(
        fakeEmailByPhone
      );

      if (!existsCustomerInfo) {
        return;
      }

      if (
        existsCustomer &&
        existsCustomer.id &&
        existsCustomer.id === existsCustomerInfo.id
      ) {
        return;
      }

      setExistsCustomer(existsCustomerInfo);

      const {
        first_name,
        last_name,
        billing: {
          city: customerProvince,
          company: customerDistrict,
          address_1: customerAddress,
          state: customerWard,
        },
      } = existsCustomerInfo;

      setCustomer({
        ...customer,
        name: `${last_name}${first_name ? ` ${first_name}` : ""}`,
        province: customerProvince,
        district: customerDistrict,
        ward: customerWard,
        address: customerAddress,
      });

      form.setFieldsValue({
        name: `${last_name}${first_name ? ` ${first_name}` : ""}`,
        province: customerProvince,
        district: customerDistrict,
        ward: customerWard,
        address: customerAddress,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const onFormSubmit = async (): Promise<boolean> => {
    setIsLoading(true);
    return form
      .validateFields([
        "name",
        "phone",
        "province",
        "district",
        "ward",
        "address",
        "email",
        "note",
      ])
      .then((values: CustomerInputs) => {
        const { name, phone, district, province, ward, address, email, note } =
          values;

        const fullWard = wardList.find(
          (wardItem: SelectData) => wardItem.value === ward
        );
        const fullProvince = provinceList.find(
          (provinceItem: SelectData) => provinceItem.value === province
        );
        const paymentMethod = payMethods[payMethod];
        const names = name.split(" ");
        const [lastName, ...firstName] = names;
        const fakeEmail = `email_${phone}@email.com`;

        const addressForShip =
          address +
          ", " +
          (fullWard?.fullLabel || "") +
          `${note && note.length ? ` (${note})` : ""}`;

        try {
          const newCustomer: CustomerCreateInfo = {
            email: fakeEmail,
            first_name: firstName.join(" "),
            last_name: lastName,
            username: phone,
            billing: {
              first_name: firstName.join(" "),
              last_name: lastName,
              company: district, //fake company by district code
              address_1: address,
              address_2: "",
              city: province, //province/city code
              state: ward, //fake state by Ward code
              postcode: "",
              country: "VN",
              email:
                email ||
                process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
                "vhy79@gmail.com",
              phone: phone,
            },
            shipping: {
              first_name: firstName.join(" "),
              last_name: lastName,
              company: "",
              address_1: address + ", " + (fullWard?.fullLabel || ""),
              address_2: "",
              city: fullProvince?.label || "",
              state: "",
              postcode: "",
              country: "VN",
            },
          };

          if (!existsCustomer || existsCustomer.email !== fakeEmail) {
            addNewCustomer(newCustomer);
          }
        } catch (error) {
          console.log({ error });
        }

        const orderProducts = carts.map((cartItem: ProductInCart) => ({
          product_id: cartItem.id,
          quantity: cartItem.quantity,
        }));

        const newOrder: OrderRequest = {
          payment_method: payMethod,
          payment_method_title: paymentMethod,
          set_paid: true,
          billing: {
            first_name: firstName.length ? firstName.join(" ") : lastName,
            last_name: lastName,
            address_1: address + ", " + (fullWard?.fullLabel || ""),
            address_2: "",
            city: fullProvince?.label || "",
            state: "",
            postcode: "",
            country: "VN",
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
            phone: phone,
          },
          shipping: {
            first_name: firstName.length ? firstName.join(" ") : lastName,
            last_name: lastName,
            address_1: addressForShip,
            address_2: "",
            city: fullProvince?.label || "",
            state: "",
            postcode: "",
            country: "VN",
          },
          line_items: orderProducts,
          shipping_lines: [
            {
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "0",
            },
          ],
        };
        NProgress.start();
        return submitNewOrder(newOrder);
      })
      .then((data) => {
        const { number } = data;
        updateCartToContextAndLocalStorage([]);
        setCustomer({
          name: "",
          email: "",
          phone: "",
          province: "",
          district: "",
          ward: "",
          address: "",
          note: "",
        });
        NProgress.done();
        setIsLoading(false);
        return number;
      })
      .catch((errorInfo) => {
        console.log({ errorInfo });
        NProgress.done();
        setIsLoading(false);
        return null;
      });
  };

  return {
    form,
    customer,
    onCustomerInputChange,
    payMethod,
    updatePayMethod,
    getExistsCustomer,
    provinces: provinceList,
    districts: districtList,
    wards: wardList,
    onFormSubmit,
    isLoading,
  };
};
