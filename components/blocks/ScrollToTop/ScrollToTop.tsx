import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {debounce} from "../../../helpers/common";
import {ScrollIcon} from "./ScrollIcon";

import "./ScrollToTop.scss";

export const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const {pathname = ""} = useRouter();

  const handleScrollToTop = () => {
    if (typeof window !== "undefined" && window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleDetectScroll = () => {
    if (typeof window !== "undefined" && window) {
      const yOffset = window.pageYOffset;

      if (yOffset > 400 && !isShow) {
        setIsShow(true);
      } else if (yOffset <= 400 && isShow) {
        setIsShow(false);
      }
    }
  };

  useEffect(() => {
    const debouceShowBtn = debounce(handleDetectScroll, 100);
    handleDetectScroll();

    window.addEventListener("scroll", debouceShowBtn);
    return () => {
      window.removeEventListener("scroll", debouceShowBtn);
    };
  }, [isShow]);

  return (
    <button
      onClick={handleScrollToTop}
      className={`scroll-top ${isShow ? "" : "hidden"} ${
        pathname.split("/")[1]
      }`}
    >
      <ScrollIcon />
    </button>
  );
};
