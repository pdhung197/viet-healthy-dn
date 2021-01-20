import {ReactNode} from "react";
import {useRouter} from "next/router";
import {TranslationProvider} from "../../../contexts/translationContext/TranslaterProvider";
import {Header} from "../../blocks/Header/Header";
import {Footer} from "../../blocks/Footer/Footer";
import {Sidebar} from "../../blocks/Sidebar/Sidebar";
import {Nav} from "../../blocks/Nav/Nav";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({children}: WrapperProps) => {
  const router = useRouter();
  const {pathname = ""} = router;

  const isAdmin = pathname.includes("/admin");

  return (
    <TranslationProvider>
      {!isAdmin && <Header />}
      {!isAdmin && <Nav />}
      <Sidebar />
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </TranslationProvider>
  );
};
