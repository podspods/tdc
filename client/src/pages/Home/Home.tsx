import { useTranslation } from "react-i18next";
import "./Home.css";
export default function Home() {
  const { t, i18n } = useTranslation("home");

  return (
    <>
      <div className={"infoBox"}>
        <h3>LANG : {i18n.language}</h3>
        <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>{t("home")}</h2>
      </div>
    </>
  );
}
