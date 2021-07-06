import {Col, Row} from "antd";
import React from "react";
import {BenefitKeys} from "../../../models/PageProps";
import {Container} from "../../blocks/Containers/Container";

type BenefitType = {
  key: BenefitKeys;
  imgPath: string;
};

const benefitsList: BenefitType[] = [
  {
    key: BenefitKeys.freeShip,
    imgPath: "/images/benefits/freeShip.png",
  },
  {
    key: BenefitKeys.save,
    imgPath: "/images/benefits/save.png",
  },
  {
    key: BenefitKeys.quality,
    imgPath: "/images/benefits/quality.png",
  },
  {
    key: BenefitKeys.support,
    imgPath: "/images/benefits/supporter.png",
  },
];

const Benefit = ({data}: {data: BenefitType}) => {
  const {key, imgPath} = data;

  return (
    <Col
      xs={{span: 24}}
      sm={{span: 12}}
      md={{span: key === BenefitKeys.quality ? 0 : 8}}
    >
      <div className="benefit__item">
        <img src={imgPath} alt="" />
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
