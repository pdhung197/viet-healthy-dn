import Link from "next/link";
import React from "react";
import {HomeProps} from "../../../models/PageProps";
import {ProductCarousel} from "../../blocks/Carousels/ProductCarousel";
import {Benefits} from "./Benefits";

import "./home.scss";

export const HomePage = (props: Partial<HomeProps>) => {
  const {productsList} = props;
  console.log({productsList});
  return (
    <>
      <Benefits />
    </>
  );
};
