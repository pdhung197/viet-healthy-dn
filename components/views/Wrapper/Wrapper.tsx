import {ReactNode} from "react";
import {useRouter} from "next/router";
import {TranslationProvider} from "../../../contexts/translationContext/TranslaterProvider";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({children}: WrapperProps) => {
  const router = useRouter();
  console.log({router});
  return (
    <TranslationProvider>
      <div>Đây là header</div>
      {children}
    </TranslationProvider>
  );
};
