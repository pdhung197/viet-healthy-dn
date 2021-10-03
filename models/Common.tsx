import { ColumnTitle } from "antd/lib/table/interface";
import { ReactNode } from "react";

export type CommonProps = {
  children: ReactNode;
};

export interface ReturnData {
  ok: boolean;
  data?: any;
  error?: any;
}

export interface CarouselSettings {
  slidesToScroll?: number;
  slidesToShow?: number;
  infinite?: boolean;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  swipeToSlide?: boolean;
  dots?: boolean;
  rows?: number;
  speed?: number;
}

export interface TableColumn {
  title: ColumnTitle<any>;
  dataIndex: string;
  key: string;
  align?: "left" | "right" | "center";
  render?: (text: string, record: any) => JSX.Element;
}

export type SelectData = {
  value: string;
  label: string;
  disabled?: boolean;
  fullLabel?: string;
};

export enum ViewModes {
  grid = "grid",
  list = "list",
}
