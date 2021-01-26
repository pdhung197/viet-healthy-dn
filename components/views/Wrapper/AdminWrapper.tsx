import {MenuFoldOutlined} from "@ant-design/icons";
import {ReactNode, useContext} from "react";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import {SwitcherBtn} from "../../blocks/Nav/Nav";
import {CustomLayout} from "./Wrapper";

type AdminWrapperProps = {
  children: ReactNode;
};

const AdminWrapper = ({children}: AdminWrapperProps) => {
  const {setSidebarCollapse} = useContext(CommonContext);

  return (
    <CustomLayout>
      <main>
        <SwitcherBtn
          onClick={setSidebarCollapse}
          icon={<MenuFoldOutlined />}
          size="middle"
        />
        {children}
      </main>
    </CustomLayout>
  );
};

export default AdminWrapper;
