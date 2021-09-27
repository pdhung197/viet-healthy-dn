import { Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/userContext/userContext";
import { calculateCartPrice } from "../../../helpers/productsFnc";
import { useCustomer } from "../../../hooks/useCustomer/useCustomer";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { CartDropMenu } from "../../blocks/CartLittle/CartDropMenu";
import { VHHead } from "../../blocks/Head/VHHead";
import { Loading } from "../../blocks/Loading/Loading";
import { CustomerInfo } from "./CustomerInfo";
import { PayMethod } from "./PayMethod";

export const CustomerConfirm = () => {
  const { carts } = useContext(UserContext);
  const customerForm = useCustomer();
  const router = useRouter();

  const totalPrice = calculateCartPrice(carts);
  const { t } = useTranslation();

  const handleSubmitOrder = async () => {
    const orderNumber = await customerForm.onFormSubmit();
    if (orderNumber) {
      router.push(`/cart?step=finish&order=${orderNumber}`, undefined, {
        shallow: true,
      });
    }
  };

  return (
    <>
      <VHHead title={t(`pageData.cart.steps.payment.title`)} />
      <Loading isShow={customerForm.isLoading} />
      <Row gutter={[24, 16]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
          <div className="info-column">
            <Row>
              <Col xs={{ span: 24 }}>
                <h2 className="steps-content__title--sub-title">
                  {t(`pageData.cart.steps.payment.customerInfo`)}
                </h2>
                <CustomerInfo {...customerForm} />
              </Col>
              <Col xs={{ span: 24 }}>
                <h2 className="steps-content__title--sub-title">
                  {t(`pageData.cart.steps.payment.paymentMethod`)}
                </h2>
                <PayMethod {...customerForm} />
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
          <div className="info-column">
            <h2 className="steps-content__title--sub-title">
              {t(`pageData.cart.steps.cart.describe`)}
            </h2>
            <CartDropMenu
              carts={carts}
              totalPrice={totalPrice}
              showRemoveBtn={false}
            />
            <div className="confirm-order">
              <button
                disabled={customerForm.isLoading || !carts || !carts.length}
                onClick={handleSubmitOrder}
                className="ant-btn ant-btn-primary"
              >
                Hoàn tất đặt hàng
              </button>
              <Link href="/products">
                <button className="ant-btn ant-btn-primary ant-btn-background-ghost">
                  Tiếp tục mua hàng
                </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
