import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BurgerMenu.css";

// BurgerMenu component - Handles the mobile navigation menu
// Uses mobile-first approach: hamburger icon on mobile, fixed sidebar on desktop
const BurgerMenu: React.FC = () => {
  // State to manage menu open/close status
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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

  // Close menu and navigate to the specified path
  const handleNavigation = (path: string): void => {
    setIsOpen(false);
    navigate(path);
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
            <Link to="/" onClick={closeMenu} className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleNavigation("/about")} className="nav-button">
              About
            </button>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu} className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
