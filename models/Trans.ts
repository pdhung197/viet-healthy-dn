import {ReactNode} from "react";

export type TranslationProps = {
  children: ReactNode;
};

export type FormatType = {
  [key in string | number]: any;
};

export type TransProps = {
  t: string;
  format?: FormatType;
  components?: React.ElementType;
};
