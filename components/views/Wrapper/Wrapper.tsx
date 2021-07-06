import React, {ReactNode} from "react";
import {useRouter} from "next/router";
import {TranslationProvider} from "../../../contexts/translationContext/TranslaterProvider";
import {CommonProvider} from "../../../contexts/commonContext/CommonProvider";
import Layout from "antd/lib/layout/layout";
import styled from "styled-components";
import AdminWrapper from "./AdminWrapper";
import UserWrapper from "./UserWrapper";
import {ContactBtns} from "../../blocks/ContactBtns/ContactBtns";
import Head from "next/head";

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
          <Head>
            <script
              async={true}
              type="text/javascript"
              src="/script/messenger.js"
            />
          </Head>
          <div id="fb-customer-chat" className="fb-customerchat"></div>
          <ContactBtns />
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
