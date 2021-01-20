import {Button} from "antd";
import Link from "next/link";
import {useTranslation} from "../../hooks/useTranslation/useTranslation";

const Admin = () => {
  const {t, setLanguage} = useTranslation();

  return (
    <div>
      {t("common.adminView", {text: "Hưng", date: "09/05/2020 09:05:00"})}
      <br />
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <Link href="/admin/abc">
        <a>Another admin page</a>
      </Link>
      <br />
      <Button onClick={() => setLanguage("en")}>English</Button>

      <Button onClick={() => setLanguage("vi")}>Tiếng Việt</Button>
    </div>
  );
};

export default Admin;
