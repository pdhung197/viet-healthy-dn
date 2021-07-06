import {ReactNode} from "react";
import styled from "styled-components";

const FixedRow = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
`;

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({children, className = ""}: ContainerProps) => {
  return (
    <FixedRow
      className={`ant-row ant-row-center ant-row-middle sc-hScDUP ernKvI features-products ${className}`}
    >
      <div className="ant-col ant-col-xs-22 ant-col-sm-22 ant-col-md-23 ant-col-lg-23 ant-col-xl-24">
        {children}
      </div>
    </FixedRow>
  );
};
