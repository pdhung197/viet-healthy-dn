import Head from "next/head";
import React from "react";

type VHHeadProps = {
  title?: string;
  name?: string;
  content?: string;
  charSet?: string;
};

export const VHHead = ({
  title,
  name = "viewport",
  content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  charSet = "utf-8",
}: VHHeadProps) => {
  return (
    <Head>
      <title>{title ? `${title} | ` : ""}Việt Healthy Đà Nẵng</title>
      <meta name={name} content={content} />
      <meta charSet={charSet} />
      <meta name="description" content="VietHealthy Da Nang" />
      <meta
        name="keywords"
        content="chăm sóc sức khỏe, dầu dừa, giải độc, kháng sinh tự nhiên"
      />
      <meta name="author" content="VietHealthy Da Nang" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
    </Head>
  );
};
