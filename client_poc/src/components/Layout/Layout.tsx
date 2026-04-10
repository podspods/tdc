import React from "react";
import "./Layout.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { API_NAME } from "../../common/constant";
import LanguageSelector from "../LanguageSelector";

// Props interface for Layout component
interface LayoutProps {
  children?: React.ReactNode;
}

// Layout component - Provides the overall structure of the application
// Includes header with burger menu and main content area
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <BurgerMenu />
        <h1 className="header-title">{API_NAME}</h1>
        <LanguageSelector />
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
