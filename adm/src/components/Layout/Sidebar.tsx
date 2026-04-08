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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { to: "/", icon: "📊", label: "Dashboard" },
  { to: "/invoice-headers", icon: "📄", label: "Invoice Headers" },
  { to: "/labor", icon: "🔧", label: "Labor" },
  { to: "/spare-parts", icon: "🔩", label: "Spare Parts" },
  { to: "/owners", icon: "👥", label: "Owners" },
  { to: "/settings", icon: "⚙️", label: "Settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarLogo>🏍️ MotoGarage</SidebarLogo>
        </SidebarHeader>
        <Nav>
          <NavSection>
            <NavSectionTitle>Main Menu</NavSectionTitle>
            {menuItems.map((item) => (
              <NavItem key={item.to} to={item.to} onClick={onClose}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavItem>
            ))}
          </NavSection>
        </Nav>
      </SidebarContainer>
    </>
  );
}
