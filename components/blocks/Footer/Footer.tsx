import React, {useEffect, useState} from "react";
import Image from "next/image";
import Head from "next/head";
import {Col, Row} from "antd";
import {Container} from "../Containers/Container";

import "./footer.scss";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {FacebookFilled, MessageFilled, PhoneFilled} from "@ant-design/icons";
import Link from "next/link";
import styled from "styled-components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {debounce} from "../../../helpers/common";

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

export const Footer = () => {
  const {t} = useTranslation();
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
      updateWidth = windowW / 4 - 35;
    } else if (md) {
      updateWidth = windowW / 2 - 35;
    } else {
      updateWidth = windowW;
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
    <>
      <Head>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v11.0&appId=2773538049524292&autoLogAppEvents=1"
          nonce="R21EldD9"
        ></script>
      </Head>
      <footer className="footer">
        <Container className="footer__container">
          <Row gutter={[24, 16]} className="footer__row">
            <Col
              sm={{span: 24}}
              md={{span: 12}}
              lg={{span: 6}}
              className="footer__col footer__col__main-info"
            >
              <div className="top-blocks">
                <div className="footer__col__main-info--logo">
                  <img
                    src="/images/logoVHY-01.png"
                    alt={t("common.footer.shopName")}
                  />
                </div>
                <h1>{t("common.footer.shopName")}</h1>
              </div>
              <div className="bottom-blocks">
                <p>{t("common.footer.connectUs")}</p>
                <div className="footer__col__main-info--social">
                  <a
                    target="_blank"
                    href="http://zalo.me/0938711074"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/icons/zalo-logo.png"
                      alt={t("common.footer.shopName")}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/viethealthy.dn"
                    rel="noopener noreferrer"
                  >
                    <FaceBookIcon />
                  </a>
                  <a
                    href="http://m.me/viethealthy.dn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessengerIcon />
                  </a>
                  <a
                    href="tel:0938711074"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneIcon />
                  </a>
                </div>
              </div>
            </Col>
            <Col
              sm={{span: 24}}
              md={{span: 12}}
              lg={{span: 6}}
              className="footer__col footer__col__address"
            >
              <div className="top-blocks">
                <h2>{t("common.footer.contact")}</h2>
              </div>
              <div className="bottom-blocks">
                <h1>{t("common.footer.baseName")}</h1>
                <p
                  dangerouslySetInnerHTML={{__html: t("common.footer.address")}}
                />
                <p
                  dangerouslySetInnerHTML={{__html: t("common.footer.email")}}
                />
                <p
                  dangerouslySetInnerHTML={{__html: t("common.footer.hotline")}}
                />
              </div>
            </Col>
            <Col
              sm={{span: 24}}
              md={{span: 12}}
              lg={{span: 6}}
              className="footer__col footer__col__links"
            >
              <div className="top-blocks">
                <h2>{t("common.footer.quickLink")}</h2>
              </div>
              <div className="bottom-blocks">
                <Link href="/products">{t("common.route.products")}</Link>
                <Link href="/payment">{t("common.route.payment")}</Link>
                <Link href="/terms">{t("common.route.terms")}</Link>
                <Link href="/contact">{t("common.route.contact")}</Link>
              </div>
            </Col>
            <Col
              sm={{span: 24}}
              md={{span: 12}}
              lg={{span: 6}}
              className="footer__col footer__col__fanpage"
            >
              <div className="top-blocks">
                <h2>{t("common.footer.fanPage")}</h2>
              </div>
              <div className="bottom-blocks">
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fviethealthy.dn%2F&tabs=messages&width=${iframeWidth}&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2773538049524292`}
                  width={iframeWidth}
                  height="400"
                  style={{border: "none", overflow: "hidden"}}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="copyright">
        <Container>
          <p dangerouslySetInnerHTML={{__html: t("common.footer.copyright")}} />
        </Container>
      </div>
    </>
  );
};
