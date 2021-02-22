import {Col, Row} from "antd";
import {ReactNode} from "react";
import styled from "styled-components";

const FixedRow = styled(Row)`
  max-width: 1190px;
  margin: 0 auto;
  width: 100%;
`;

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({children}: ContainerProps) => {
  return (
    <FixedRow justify="center" align="middle">
      <Col
        xs={{span: 22}}
        sm={{span: 22}}
        md={{span: 23}}
        lg={{span: 23}}
        xl={{span: 24}}
      >
        {children}
      </Col>
    </FixedRow>
  );
};
