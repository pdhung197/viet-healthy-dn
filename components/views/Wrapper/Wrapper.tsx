import dynamic from "next/dynamic";
import {ReactNode} from "react";
import {useRouter} from "next/router";
import {TranslationProvider} from "../../../contexts/translationContext/TranslaterProvider";
import {CommonProvider} from "../../../contexts/commonContext/CommonProvider";
import {Sidebar} from "../../blocks/Sidebar/Sidebar";
import Layout from "antd/lib/layout/layout";
import styled from "styled-components";
import AdminWrapper from "./AdminWrapper";
import UserWrapper from "./UserWrapper";

export const CustomLayout = styled(Layout)`
  background: none;
`;

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({children}: WrapperProps) => {
  const router = useRouter();
  const {pathname = ""} = router;

  const isAdmin = pathname.includes("/admin");

  return (
    <CommonProvider>
      <TranslationProvider>
        <>
          <Sidebar />
          {isAdmin ? (
            <AdminWrapper>{children}</AdminWrapper>
          ) : (
            <UserWrapper>{children}</UserWrapper>
          )}
        </>
      </TranslationProvider>
    </CommonProvider>
  );
};
