import React, {LegacyRef, useRef, useState} from "react";
import {ScrollToTop} from "../ScrollToTop/ScrollToTop";

import "./ContactBtns.scss";
import {PhoneIcon} from "../SVGIcons/PhoneIcon";
import {FbEmbed} from "../FacebookContact/FbEmbed";
import useOutsideClick from "../../../hooks/useClickOutside/useClickOutside";

export const ContactBtns = () => {
  const [isMessageBoxActive, setIsMessageBoxActive] = useState(false);
  const messageBoxRef = useRef<LegacyRef<HTMLDivElement> | undefined>();

  const handleSwitchActiveMessageBox = () => {
    setIsMessageBoxActive(!isMessageBoxActive);
  };
  useOutsideClick(messageBoxRef, () => {
    if (isMessageBoxActive) {
      setIsMessageBoxActive(false);
    }
  });

  return (
    <>
      <ScrollToTop />
      <a href="tel:0938711074" rel="noopener noreferrer" className="phone-call">
        <PhoneIcon />
        <span>0938 711 074</span>
      </a>
      <a
        href="http://zalo.me/0938711074"
        target="_blank"
        rel="noopener noreferrer"
        className="zalo-contact btn blue"
      >
        <img src="/images/icons/zalo-trans.png" alt="" />
      </a>
      <div className="messenger-back"></div>
    </>
  );
};
