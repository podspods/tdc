import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BurgerMenu2.css";

// Interface for menu items
interface MenuItem {
  id: string;
  label: string;
  path: string;
}

// BurgerMenu component with modern design
const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Menu items data
  const menuItems: MenuItem[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "services", label: "Services", path: "/services" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Toggle menu function
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Close menu and navigate to the selected page
  const handleItemClick = (path: string): void => {
    setIsOpen(false);
    navigate(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling on body
      document.body.style.overflow = "hidden";
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="burger-menu" ref={menuRef}>
      {/* Burger button with icon that transforms to X */}
      <button
        className={`burger-button ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Overlay with 90% opacity */}
      <div
        className={`menu-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menu items list */}
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <nav className="menu-nav" aria-label="Main navigation">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleItemClick(item.path)} className="menu-item">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
