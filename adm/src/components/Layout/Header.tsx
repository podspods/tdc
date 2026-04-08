import { GARAGE_NAME } from "../../common/constant";
import { Avatar, HeaderContainer, Logo, MenuButton, RightSection, Title } from "./Header.styled";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuClick}>☰</MenuButton>
      <Logo>🏍️ {GARAGE_NAME}</Logo>
      <Title>Invoice Headers</Title>
      <RightSection>
        <Avatar>AD</Avatar>
      </RightSection>
    </HeaderContainer>
  );
}
