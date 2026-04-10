import React from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n";

/**
 * Language selector component
 * Allows users to switch between English, Vietnamese, and French
 */
const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation("navigation");

  /**
   * Handle language change
   * @param lng - Language code to switch to
   */
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    // Optional: Store in localStorage or cookie (already handled by detector)
  };

  /**
   * Get current language display name
   */
  const getCurrentLanguage = () => {
    const current = supportedLanguages.find((lang) => lang.code === i18n.language);
    return current || supportedLanguages[0];
  };

  // Styles
  const styles = {
    container: {
      // position: "relative" as const,
      // display: "inline-block",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    dropdown: {
      position: "absolute" as const,
      top: "100%",
      right: 0,
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      zIndex: 1000,
      minWidth: "150px",
      marginTop: "5px",
    },
    dropdownItem: {
      padding: "10px 15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "background-color 0.2s",
      borderBottom: "1px solid #f3f4f6",
    },
    dropdownItemHover: {
      backgroundColor: "#f3f4f6",
    },
    flag: {
      fontSize: "1.2em",
    },
    activeItem: {
      backgroundColor: "#e5e7eb",
      fontWeight: "bold" as const,
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const currentLang = getCurrentLanguage();

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setIsOpen(!isOpen)} aria-label={t("language")}>
        <span style={styles.flag}>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <span>▼</span>
      </button>
      {isOpen && (
        <div style={styles.dropdown}>
          {supportedLanguages.map((lang) => (
            <div
              key={lang.code}
              style={{
                ...styles.dropdownItem,
                ...(lang.code === i18n.language ? styles.activeItem : {}),
              }}
              onClick={() => {
                handleLanguageChange(lang.code);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (lang.code !== i18n.language) {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }
              }}
              onMouseLeave={(e) => {
                if (lang.code !== i18n.language) {
                  e.currentTarget.style.backgroundColor = "white";
                }
              }}
            >
              <span style={styles.flag}>{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === i18n.language && <span style={{ marginLeft: "auto" }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
