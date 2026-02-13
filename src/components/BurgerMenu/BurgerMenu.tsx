import React, { useState, useEffect } from "react";
import "./BurgerMenu.css";

// BurgerMenu component - Handles the mobile navigation menu
// Uses mobile-first approach: hamburger icon on mobile, fixed sidebar on desktop
const BurgerMenu: React.FC = () => {
  // State to manage menu open/close status
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Effect to handle body scroll locking when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on body when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Toggle menu open/close state
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Close menu handler
  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="burger-menu">
      {/* Burger button - visible on mobile */}
      <button
        className={`burger-button ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Overlay - visible when menu is open on mobile */}
      <div
        className={`menu-overlay ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu content */}
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <p>Navigation</p>
        </div>

        <ul className="menu-nav">
          <li>
            <a href="/" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
