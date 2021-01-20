import {ReactNode} from "react";
import {useRouter} from "next/router";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({children}: WrapperProps) => {
  const router = useRouter();
  console.log({router});
  return (
    <>
      <div>Đây là header</div>
      {children}
    </>
  );
};
