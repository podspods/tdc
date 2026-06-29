// components/UI/FloatingLabelInput.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ $hasLabel: boolean }>`
  position: relative;
  margin-top: ${({ $hasLabel, theme }) => ($hasLabel ? theme.spacing.md : "0")};
  width: 100%;
  overflow: visible;
`;

const StyledInput = styled.input<{ $customFontSize?: string }>`
  width: 100%;
  padding: 16px 12px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ $customFontSize, theme }) => $customFontSize || theme.fontSize.base};
  outline: none;
  transition: border-color 0.2s;
  background: ${({ theme }) => theme.colors.background.white};
  color: ${({ theme }) => theme.colors.text.primary};
  z-index: 1;
  /* position: relative; */
  &:focus {
    border-color: ${({ theme }) => theme.colors.text.brand};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
  }
`;
const StyledLabel = styled.label<{ $isFloating: boolean; $maxWidth?: string }>`
  position: absolute;
  left: 12px;
  top: ${({ $isFloating }) => ($isFloating ? "-8px" : "50%")};
  transform: translateY(${({ $isFloating }) => ($isFloating ? "0" : "-50%")});
  background-color: ${({ $isFloating, theme }) =>
    $isFloating ? theme.colors.background.white : "transparent"};
  padding: 0 4px;
  font-size: ${({ $isFloating, theme }) => ($isFloating ? theme.fontSize.xs : theme.fontSize.base)};
  color: ${({ $isFloating, theme }) =>
    $isFloating ? theme.colors.text.brand : theme.colors.text.secondary};
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 0;
  /*text Troncature  */
  max-width: ${({ $maxWidth }) => $maxWidth || "calc(100% - 24px)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Tooltip on hover */
  cursor: default;
`;

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  width?: string; // for example "300px", "50%", "20rem"
  fontSize?: string;
  maxLabelWidth?: string;
};

export function Input({ label, value, onChange, ...props }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "" && value !== undefined && value !== null;
  const hasLabel = label !== null && label !== undefined && label !== "";
  const isFloating = isFocused || hasValue;

  return (
    <Wrapper style={{ width: props.width || "100%" }} $hasLabel={hasLabel}>
      <StyledInput
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        $customFontSize={props.fontSize}
        {...props}
      />
      <StyledLabel $isFloating={isFloating} $maxWidth={props.maxLabelWidth} title={label}>
        {label}
      </StyledLabel>
    </Wrapper>
  );
}
