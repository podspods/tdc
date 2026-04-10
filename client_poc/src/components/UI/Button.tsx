import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
  $loading?: boolean;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.gray500};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray600};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;

    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;

    &:hover:not(:disabled) {
      background-color: #059669;
    }
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warning};
    color: white;

    &:hover:not(:disabled) {
      background-color: #d97706;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
    min-height: 32px;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSize.base};
    min-height: 40px;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fontSize.lg};
    min-height: 48px;
  `,
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant = "primary" }) => variantStyles[$variant]}
  ${({ $size = "md" }) => sizeStyles[$size]}
`;

export const Button: React.FC<ButtonProps> = ({ children, $loading, disabled, ...props }) => {
  return (
    <StyledButton disabled={disabled || $loading} {...props}>
      {$loading && <span className="spinner" />}
      {children}
    </StyledButton>
  );
};
