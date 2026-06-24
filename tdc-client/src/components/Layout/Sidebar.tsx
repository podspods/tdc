import { useTranslation } from "react-i18next";
import {
  Nav,
  NavItem,
  NavSection,
  NavSectionTitle,
  Overlay,
  SidebarContainer,
  SidebarHeader,
  SidebarLogo,
} from "./Sidebar.styled";
import { GARAGE_NAME } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// https://unicode.org/emoji/charts/emoji-list.html

const menuItems = [
  { to: "/", icon: "🏠", label: "home" },
  { to: "/todoList", icon: "🗒", label: "TodoList" },
  { isSeparator: true },
  // { to: "/test", icon: "📄", label: "Test" },
  { to: "/invoice", icon: "🧾", label: "invoice" },
  { isSeparator: true },
  { to: "/admin/garage", icon: "🔧", label: "Garage" },

  { to: "/cost", icon: "💰", label: "cost" },
  { to: "/owner", icon: "🤡", label: "owner" },
  { to: "/vehicle", icon: "🏍", label: "vehicle" },
  { to: "/task", icon: "🛠", label: "task" },
  // { to: "/spare-parts", icon: "🔩", label: "spareParts" },
  { isSeparator: true },
  { to: "/model", icon: "⚙️", label: "Model" },
  { to: "/setting", icon: "⚙️", label: "settings" },
  { to: "/correspondance", icon: "⚙️", label: "Correspondance" },
  { to: "/partAndLabor", icon: "⚙️", label: "partAndLabor" },
];

const Separator = styled.hr`
  margin: 12px 16px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.text.black};
`;

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation(["navigation"]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarLogo onClick={handleClick} style={{ cursor: "pointer" }}>
            🏍️ {GARAGE_NAME}
          </SidebarLogo>
        </SidebarHeader>
        <Nav>
          <NavSection>
            <NavSectionTitle>{t("mainMenu")}</NavSectionTitle>
            {menuItems.map((item, index) => {
              if ("isSeparator" in item) {
                return <Separator key={`sep-${index}`} />;
              }
              return (
                <NavItem key={item.to} to={item.to} onClick={onClose}>
                  <span>{item.icon}</span>
                  <span>{t(item.label)}</span>
                </NavItem>
              );
            })}
          </NavSection>
        </Nav>
      </SidebarContainer>
    </>
  );
}
