// components/UI/FloatingLabelTextarea.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 20px 12px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  background: transparent;

  &:focus {
    border-color: #2563eb;
  }
`;

const StyledLabel = styled.label<{ $isFloating: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isFloating }) => ($isFloating ? "6px" : "20px")};
  font-size: ${({ $isFloating }) => ($isFloating ? "12px" : "16px")};
  background-color: ${({ $isFloating }) => ($isFloating ? "white" : "transparent")};
  padding: 0 4px;
  color: ${({ $isFloating }) => ($isFloating ? "#2563eb" : "#666")};
  transition: all 0.2s ease;
  pointer-events: none;
`;

type FloatingLabelTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function FloatingLabelTextarea({
  label,
  value,
  onChange,
  ...props
}: FloatingLabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!value;

  const isFloating = isFocused || hasValue;

  return (
    <Wrapper>
      <StyledTextarea
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
