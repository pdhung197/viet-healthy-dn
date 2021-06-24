import {Col, Row} from "antd";
import React, {ReactElement} from "react";
import {FaPiggyBank, FaShippingFast} from "react-icons/fa";
import {BsAwardFill} from "react-icons/bs";
import {BiSupport} from "react-icons/bi";
import {BenefitKeys} from "../../../models/PageProps";
import {Container} from "../../blocks/Containers/Container";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

type BenefitType = {
  key: BenefitKeys;
  icon: () => ReactElement<any, any>;
};

const benefitsList: BenefitType[] = [
  {
    key: BenefitKeys.freeShip,
    icon: () => <FaShippingFast />,
  },
  {
    key: BenefitKeys.save,
    icon: () => <FaPiggyBank />,
  },
  {
    key: BenefitKeys.quality,
    icon: () => <BsAwardFill />,
  },
  {
    key: BenefitKeys.support,
    icon: () => <BiSupport />,
  },
];

const Benefit = ({data}: {data: BenefitType}) => {
  const {t} = useTranslation();
  const {key, icon} = data;
  const langData = t(`pageData.homePage.benefits.${key}`);
  if (!langData) {
    return null;
  }
  const {title, describe1, describe2 = ""} = langData;

  return (
    <Col xs={{span: 24}} sm={{span: 12}} md={{span: 6}}>
      <div className="benefit__item">
        <div className="benefit__item__icon">{icon()}</div>
        <h2 className="benefit__item__title">{title}</h2>
        <p
          className="benefit__item__des"
          dangerouslySetInnerHTML={{__html: describe1}}
        />
        <p
          className="benefit__item__des"
          dangerouslySetInnerHTML={{__html: describe2}}
        />
      </div>
    </Col>
  );
};

export const Benefits = () => {
  return (
    <Container className="benefit">
      <div className="benefit__wrapper">
        <Row gutter={[24, 18]}>
          {benefitsList.map((benefit: BenefitType) => (
            <Benefit key={benefit.key} data={benefit} />
          ))}
        </Row>
      </div>
    </Container>
  );
};
