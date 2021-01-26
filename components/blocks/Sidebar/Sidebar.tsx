import Sider from "antd/lib/layout/Sider";
import {useContext} from "react";
import styled from "styled-components";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import {Brand} from "../Brand/Brand";
import {MainMenu} from "../Nav/MainMenu";

import "./sidebar.scss";

const Spacing = styled.div`
  height: 30px;
`;

export const Sidebar = () => {
  const {isSidebarCollapse} = useContext(CommonContext);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={isSidebarCollapse}
      theme="light"
      style={{
        position: "fixed",
        top: 0,
        overflow: "auto",
      }}
    >
      <Brand mode="vertical" />
      <div style={{height: 30}} />
      <MainMenu mode="inline" />
    </Sider>
  );
};
