import {ReactNode} from "react";

export type CommonProps = {
  children: ReactNode;
};

export interface ReturnData {
  ok: boolean;
  data?: any;
  error?: any;
}
