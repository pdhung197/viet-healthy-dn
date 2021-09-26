import { Collapse } from "antd";
import React from "react";
import { CustomerForm } from "../../../hooks/useCustomer/useCustomer";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { PayMethods } from "../../../models/Customer";

import baseInfo from "./../../../localize/common-info.json";

const { Panel } = Collapse;

interface PayMethodProps extends CustomerForm {}

export const PayMethod = ({ payMethod, updatePayMethod }: PayMethodProps) => {
  const { t } = useTranslation();

  const handleChangeActivePanel = (key: string | string[]) => {
    updatePayMethod(key as PayMethods);
  };

  return (
    <Collapse
      onChange={handleChangeActivePanel}
      accordion
      activeKey={payMethod}
      className="pay-method"
    >
      <Panel
        showArrow={false}
        header={
          <>
            <input
              type="radio"
              name="paymen-method"
              id="paymen-method_bank"
              checked={payMethod === "bacs"}
              onChange={() => {}}
            />
            <span>{t("pageData.cart.customerForm.paymethod.bank.title")}</span>
          </>
        }
        key="bacs"
      >
        <div className="bank-account">
          <p className="bank-account_bank">{baseInfo["payment-info"].bank}</p>
          <p className="bank-account_branch">
            {baseInfo["payment-info"].branch}
          </p>
          <p className="bank-account_bank">
            <span>
              {t("pageData.cart.customerForm.paymethod.bank.accountName")}:
            </span>
            <span>{baseInfo["payment-info"]["account-name"]}</span>
          </p>
          <p className="bank-account_bank">
            <span>
              {t("pageData.cart.customerForm.paymethod.bank.account")}:
            </span>
            <span>{baseInfo["payment-info"].account}</span>
          </p>
        </div>
      </Panel>
      <Panel
        showArrow={false}
        header={
          <>
            <input
              type="radio"
              name="paymen-method"
              id="paymen-method_cod"
              checked={payMethod === "cod"}
              onChange={() => {}}
            />
            <span>{t("pageData.cart.customerForm.paymethod.cod.title")}</span>
          </>
        }
        key="cod"
      >
        <p>{t("pageData.cart.customerForm.paymethod.cod.content")}</p>
      </Panel>
    </Collapse>
  );
};
