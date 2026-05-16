// components/UI/FloatingLabelInput.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 12px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  background: transparent;

  &:focus {
    border-color: #2563eb;
  }
`;

const StyledLabel = styled.label<{ $isFloating: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isFloating }) => ($isFloating ? "-8px" : "50%")};
  transform: translateY(${({ $isFloating }) => ($isFloating ? "0" : "-50%")});
  background-color: ${({ $isFloating }) => ($isFloating ? "white" : "transparent")};
  padding: 0 4px;
  font-size: ${({ $isFloating }) => ($isFloating ? "12px" : "16px")};
  color: ${({ $isFloating }) => ($isFloating ? "#2563eb" : "#666")};
  transition: all 0.2s ease;
  pointer-events: none;
`;

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  width?: string; // par exemple "300px", "50%", "20rem"
};

export function Input({ label, value, onChange, ...props }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!value;

  const isFloating = isFocused || hasValue;

  return (
    <Wrapper style={{ width: props.width || "100%" }}>
      <StyledInput
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <StyledLabel $isFloating={isFloating}>{label}</StyledLabel>
    </Wrapper>
  );
}
