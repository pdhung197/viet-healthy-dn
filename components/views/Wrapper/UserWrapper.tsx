import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Layout from "antd/lib/layout/layout";
import {ReactNode, useContext, useEffect} from "react";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import {Footer} from "../../blocks/Footer/Footer";
import {Header} from "../../blocks/Header/Header";
import {Nav} from "../../blocks/Nav/Nav";
import {SearchAndBanner} from "../SearchAndBanner/SearchAndBanner";
import {CustomLayout} from "./Wrapper";

type UserWrapperProps = {
  children: ReactNode;
};

const UserWrapper = ({children}: UserWrapperProps) => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const screens = useBreakpoint();

  const isMobile = !screens.md || !screens.lg;

  useEffect(() => {
    if (!isMobile && !isSidebarCollapse) {
      setSidebarCollapse();
    }
  }, [isMobile]);

  return (
    <CustomLayout>
      <Header />
      <Nav />
      <main style={{marginTop: 30}}>
        <SearchAndBanner />
        {children}
      </main>
      <Footer />
    </CustomLayout>
  );
};

export default UserWrapper;
