import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: all 0.2s ease;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray700};
`;
