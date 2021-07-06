import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, {useEffect, useState} from "react";
import {debounce} from "../../../helpers/common";

export const FbEmbed = () => {
  const screens = useBreakpoint();

  const calculateIframeWidth = (): number => {
    if (typeof window === "undefined" || !window) {
      return 0;
    }
    let updateWidth = 0;
    const {md, lg, xl} = screens;
    const windowW = window.innerWidth > 1208 ? 1140 : window.innerWidth;

    if (xl) {
      updateWidth = windowW / 4 - 20;
    } else if (lg) {
      updateWidth = windowW / 4 - 32;
    } else if (md) {
      updateWidth = windowW / 2 - 32;
    } else {
      updateWidth = windowW - 32;
    }
    if (updateWidth > 500) {
      return 500;
    }

    return Math.floor(updateWidth);
  };

  const [iframeWidth, setIframeWidth] = useState(calculateIframeWidth());

  useEffect(() => {
    const handleUpdateIframeWidthOnResize = debounce(() => {
      const updateWidth = calculateIframeWidth();

      setIframeWidth(updateWidth);
    }, 300);

    handleUpdateIframeWidthOnResize();
    window.addEventListener("resize", handleUpdateIframeWidthOnResize);
    return () => {
      window.removeEventListener("resize", handleUpdateIframeWidthOnResize);
    };
  }, [screens]);
  return (
    <iframe
      src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fviethealthy.dn%2F&tabs=timeline&width=${iframeWidth}&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2773538049524292`}
      width={iframeWidth}
      height="300"
      style={{border: "none", overflow: "hidden"}}
      scrolling="no"
      frameBorder="0"
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  );
};
