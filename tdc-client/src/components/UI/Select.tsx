// components/UI/FloatingLabelSelect.tsx
import React from "react";
import styled from "styled-components";
import type { OptionValue } from "../../common/commun.types";
import { defaultPlaceHolder } from "../../common/constant";

const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 16px 12px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  background: white;
  appearance: none;
  cursor: pointer;

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

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: OptionValue[];
  width?: string;
  placeholder?: string;
};

export function Select({ ...props }: SelectProps) {
  // const [isFocused, setIsFocused] = useState(false);
  // const hasValue = value !== undefined && value !== "";
  // const isFloating = isFocused || hasValue;

  const isFloating = true;

  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <Wrapper style={{ width: props.width || "100%" }}>
      <StyledSelect value={props.value} {...props}>
        <option>{props.placeholder ? props.placeholder : defaultPlaceHolder}</option>
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel $isFloating={isFloating}>{props.label}</StyledLabel>
    </Wrapper>
  );
}
