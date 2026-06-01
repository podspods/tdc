import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { supportedLanguages } from "../../i18n";
import { Button } from "../../common/common.styled";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  min-width: 160px;
`;

const DropdownItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.background : "transparent")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Flag = styled.span`
  font-size: 18px;
`;

export function LanguageSelector() {
  const { i18n, t } = useTranslation("navigation");
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === i18n.language) || supportedLanguages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Flag>{currentLanguage.flag}</Flag>
        {/* <span>{currentLanguage.name}</span> */}
        <span> ▼</span>
      </Button>

      {isOpen && (
        <Dropdown>
          {supportedLanguages.map((lang) => (
            <DropdownItem
              key={lang.code}
              $active={lang.code === i18n.language}
              onClick={() => changeLanguage(lang.code)}
            >
              <Flag>{lang.flag}</Flag>
              <span>{lang.name}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}
