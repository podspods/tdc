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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { to: "/", icon: "📊", label: "home" },
  { to: "/owner", icon: "👥", label: "owner" },
  { to: "/vehicle", icon: "📄", label: "vehicle" },
  { to: "/task", icon: "📄", label: "task" },
  { to: "/invoice", icon: "📄", label: "invoice" },
  { to: "/labor", icon: "🔧", label: "labor" },
  { to: "/spare-parts", icon: "🔩", label: "spareParts" },
  { to: "/settings", icon: "⚙️", label: "settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation(["navigation"]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarLogo>🏍️ {GARAGE_NAME}</SidebarLogo>
        </SidebarHeader>
        <Nav>
          <NavSection>
            <NavSectionTitle>{t("mainMenu")}</NavSectionTitle>
            {menuItems.map((item) => (
              <NavItem key={item.to} to={item.to} onClick={onClose}>
                <span>{item.icon}</span>
                <span>{t(item.label)}</span>
              </NavItem>
            ))}
          </NavSection>
        </Nav>
      </SidebarContainer>
    </>
  );
}
