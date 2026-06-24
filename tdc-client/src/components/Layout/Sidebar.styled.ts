import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.colors.background.white};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 201;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: sticky;
    transform: none;
    top: 0;
    height: 100vh;
    box-shadow: none;
    border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
    width: 260px;
  }
`;

export const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SidebarLogo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.success};
  }
`;

export const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NavSectionTitle = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: 0.5px;
`;
