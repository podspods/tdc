import React from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Layout.css";
import { HelloWorld } from "../HelloWord/Helloword";

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
        <h1 className="header-title">TDC</h1>
      </header>

      <main className="main-content">{children || <HelloWorld />}</main>
    </div>
  );
};

export default Layout;
