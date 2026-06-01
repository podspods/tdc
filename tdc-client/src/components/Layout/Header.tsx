import { useTranslation } from "react-i18next";
import { GARAGE_NAME } from "../../common/constant";
import { Avatar, HeaderContainer, Logo, MenuButton, RightSection, Title } from "./Header.styled";
import { LanguageSelector } from "./LanguageSelector";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  //-
  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuClick}>☰</MenuButton>
      <Logo onClick={handleClick} style={{ cursor: "pointer" }}>
        🏍️ {GARAGE_NAME}
      </Logo>
      <Title>{t("userPage")}</Title>
      <RightSection>
        <LanguageSelector />
        <Avatar>AD</Avatar>
      </RightSection>
    </HeaderContainer>
  );
}
