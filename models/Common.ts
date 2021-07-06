import {ReactNode} from "react";

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
