import React from "react";
import styled from "styled-components";
import {FacebookFilled, MessageFilled, PhoneFilled} from "@ant-design/icons";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

const FaceBookIcon = styled(FacebookFilled)`
  path {
    fill: #3b5998;
  }
`;

const MessengerIcon = styled(MessageFilled)`
  path {
    fill: #006aff;
  }
`;

const PhoneIcon = styled(PhoneFilled)`
  path {
    fill: #ff0000;
  }
`;

export const SocialContactBtns = () => {
  const {t} = useTranslation();

  return (
    <>
      <a
        target="_blank"
        href="http://zalo.me/0938711074"
        rel="noopener noreferrer"
      >
        <img
          src="/images/icons/zalo-logo.png"
          alt={t("common.footer.shopName")}
        />
        <label>Zalo</label>
      </a>
      <a
        target="_blank"
        href="https://www.facebook.com/viethealthy.dn"
        rel="noopener noreferrer"
      >
        <FaceBookIcon />
        <label>Fanpage</label>
      </a>
      <a
        href="http://m.me/viethealthy.dn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessengerIcon />
        <label>Messenger</label>
      </a>
      <a href="tel:0938711074" target="_blank" rel="noopener noreferrer">
        <PhoneIcon />
        <label>Phone</label>
      </a>
    </>
  );
};
