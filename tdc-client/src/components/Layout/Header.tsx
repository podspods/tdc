import { useTranslation } from "react-i18next";
import { GARAGE_NAME } from "../../common/constant";
import { Avatar, HeaderContainer, Logo, MenuButton, RightSection, Title } from "./Header.styled";
import { LanguageSelector } from "./LanguageSelector";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation(["common"]);

  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuClick}>☰</MenuButton>
      <Logo>🏍️ {GARAGE_NAME}</Logo>
      <Title>{t("userPage")}</Title>
      <RightSection>
        <LanguageSelector />
        <Avatar>AD</Avatar>
      </RightSection>
    </HeaderContainer>
  );
}
