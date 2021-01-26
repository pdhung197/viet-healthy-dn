import {MenuFoldOutlined} from "@ant-design/icons";
import {Button, Grid} from "antd";
import {useContext} from "react";
import styled from "styled-components";
import {theme} from "../../../configs/theme/theme";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import {Brand} from "../Brand/Brand";
import {CartLittle} from "../CartLittle/CartLittle";
import {Container} from "../Containers/Container";
import {MainMenu} from "./MainMenu";

const {useBreakpoint} = Grid;

const MainNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  > div {
    height: 100%;
  }

  .head-menu {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 70px;
  }

  .menu-logo {
    height: 70px;
    padding: 0;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    a {
      height: 100%;
    }

    img {
      margin: 0;
      height: 100%;
    }
  }
`;

const RightGroup = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SwitcherBtn = styled(Button)`
  margin: 0;
  padding: 2px !important;
  border-radius: 0 !important;
  border-color: ${theme.primaryColor};
  height: 36px !important;
  width: 36px !important;
  margin-left: 10px;
  border-width: 2px;

  svg {
    width: 30px;
    height: 30px;
    color: ${theme.primaryColor};
  }
`;

export const Nav = () => {
  const {setSidebarCollapse} = useContext(CommonContext);
  const screens = useBreakpoint();

  const isMobile = !screens.md || !screens.lg;

  return (
    <Container>
      <MainNav>
        <Brand />
        {!isMobile && (
          <div className="head-menu">
            <MainMenu />
          </div>
        )}
        <RightGroup>
          <CartLittle isMobile={isMobile} />
          {isMobile && (
            <SwitcherBtn
              onClick={setSidebarCollapse}
              icon={<MenuFoldOutlined />}
              size="middle"
            />
          )}
        </RightGroup>
      </MainNav>
    </Container>
  );
};
