import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
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

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
    min-height: 36px;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSize.base};
    min-height: 44px;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fontSize.lg};
    min-height: 52px;
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

export function Button({ children, $loading, disabled, ...props }: ButtonProps) {
  return (
    <StyledButton disabled={disabled || $loading} {...props}>
      {$loading && <span>⏳</span>}
      {children}
    </StyledButton>
  );
}
