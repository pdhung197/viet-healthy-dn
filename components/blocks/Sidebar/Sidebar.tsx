import Sider from "antd/lib/layout/Sider";
import {LegacyRef, useRef} from "react";
import {useContext} from "react";
import styled from "styled-components";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import useOutsideClick from "../../../hooks/useClickOutside/useClickOutside";
import {Brand} from "../Brand/Brand";
import {MainMenu} from "../Nav/MainMenu";

import "./sidebar.scss";

const Spacing = styled.div`
  height: 30px;
`;

export const Sidebar = () => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const sideRef = useRef<LegacyRef<HTMLDivElement> | undefined>();
  useOutsideClick(sideRef, () => setSidebarCollapse(true));

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
      <div ref={sideRef as LegacyRef<HTMLDivElement>}>
        <MainMenu mode="inline" />
      </div>
    </Sider>
  );
};
