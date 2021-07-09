import {Steps} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, {ReactNode, useState} from "react";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {Container} from "../../blocks/Containers/Container";

import "./CartAndPay.scss";
import {CartConfirm} from "./CartConfirm";
import {CustomerConfirm} from "./CustomerConfirm";
import {FinishForm} from "./FinishForm";

const {Step} = Steps;

type StepType = "cart" | "payment" | "finish";
type StepStatus = "wait" | "process" | "finish";

type CartAndPayProps = {
  step?: StepType;
};

type StepData = {
  step: StepType;
  index: number;
  component: () => JSX.Element;
};

const stepDatas: StepData[] = [
  {
    step: "cart",
    index: 0,
    component: () => <CartConfirm />,
  },
  {
    step: "payment",
    index: 1,
    component: () => <CustomerConfirm />,
  },
  {
    step: "finish",
    index: 2,
    component: () => <FinishForm />,
  },
];

export const CartAndPay = ({step = "cart"}: CartAndPayProps) => {
  const {t} = useTranslation();
  const [current, setCurrent] = useState(
    stepDatas.find((stepData: StepData) => stepData.step === step)?.index || 0
  );
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const onChange = (currentValue: number) => {
    setCurrent(currentValue);
  };

  return (
    <Container>
      <Steps
        direction={isMobile ? "vertical" : "horizontal"}
        type="navigation"
        current={current}
        onChange={onChange}
        className="cart-steps"
      >
        {stepDatas.map((stepData: StepData) => {
          const status: StepStatus =
            current === stepData.index
              ? "process"
              : current > stepData.index
              ? "finish"
              : "wait";

          return (
            <Step
              // disabled={status === "wait"}
              key={stepData.step}
              status={status}
              title={t(`pageData.cart.steps.${stepData.step}.title`)}
            />
          );
        })}
      </Steps>
      <div className="steps-content">
        <h2 className="steps-content__title">
          {t(`pageData.cart.steps.${stepDatas[current].step}.describe`)}
        </h2>
        {stepDatas[current].component()}
      </div>
    </Container>
  );
};
