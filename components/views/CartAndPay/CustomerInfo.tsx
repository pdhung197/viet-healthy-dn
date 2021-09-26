import {Form, Input} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import {CustomerForm} from "../../../hooks/useCustomer/useCustomer";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {InputSelect} from "../../blocks/Forms/InputSelect";

const {TextArea} = Input;

interface CustomerInfoProps extends CustomerForm {}

export const CustomerInfo = ({
  form,
  customer,
  onCustomerInputChange,
  getExistsCustomer,
  provinces,
  districts,
  wards,
}: CustomerInfoProps) => {
  const {md} = useBreakpoint();
  const {t} = useTranslation();
  console.log({customer});
  return (
    <Form
      className="customer-form"
      form={form}
      name="customer-info"
      labelCol={{span: md ? 8 : 24}}
      wrapperCol={{span: 16}}
      initialValues={customer}
      labelAlign="left"
      size="large"
    >
      <Form.Item
        label={t("pageData.cart.customerForm.fields.phone")}
        name="phone"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.phone"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <Input
          name="phone"
          onChange={onCustomerInputChange}
          onBlur={getExistsCustomer}
          placeholder={t("pageData.cart.customerForm.placeholder.phone")}
          autoFocus={true}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.name")}
        name="name"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.name"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <Input
          name="name"
          onChange={onCustomerInputChange}
          placeholder={t("pageData.cart.customerForm.placeholder.name")}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.email")}
        name="email"
      >
        <Input
          name="email"
          onChange={onCustomerInputChange}
          placeholder={t("pageData.cart.customerForm.placeholder.email")}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.province")}
        name="province"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.province"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <InputSelect
          options={[
            {
              value: "",
              label: t("pageData.cart.customerForm.placeholder.province"),
              disabled: true,
            },
            ...provinces,
          ]}
          onChange={onCustomerInputChange}
          name="province"
          placeholder={t("pageData.cart.customerForm.placeholder.province")}
          value={customer.province}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.district")}
        name="district"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.district"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <InputSelect
          options={[
            {
              value: "",
              label: t("pageData.cart.customerForm.placeholder.district"),
              disabled: true,
            },
            ...districts,
          ]}
          onChange={onCustomerInputChange}
          name="district"
          placeholder={t("pageData.cart.customerForm.placeholder.district")}
          value={customer.district}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.ward")}
        name="ward"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.ward"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <InputSelect
          value={customer.ward}
          options={[
            {
              value: "",
              label: t("pageData.cart.customerForm.placeholder.ward"),
              disabled: true,
            },
            ...wards,
          ]}
          onChange={onCustomerInputChange}
          name="ward"
          placeholder={t("pageData.cart.customerForm.placeholder.ward")}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.address")}
        name="address"
        rules={[
          {
            required: true,
            message: t("common.validation.isRequired", {
              fieldName: t(
                "pageData.cart.customerForm.fields.address"
              ).toLowerCase(),
            }),
          },
        ]}
      >
        <Input
          name="address"
          onChange={onCustomerInputChange}
          placeholder={t("pageData.cart.customerForm.placeholder.address")}
        />
      </Form.Item>
      <Form.Item
        label={t("pageData.cart.customerForm.fields.note")}
        name="note"
      >
        <TextArea
          name="note"
          onChange={onCustomerInputChange}
          placeholder={t("pageData.cart.customerForm.placeholder.note")}
        />
      </Form.Item>
    </Form>
  );
};
