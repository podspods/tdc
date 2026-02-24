import React from "react";
import "./Layout.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu2";

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
        <h1 className="header-title">Hello World App</h1>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
