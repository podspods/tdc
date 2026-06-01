import styled from "styled-components";

export const MainContainer = styled.div<{
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
}>`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.background.white};
  border-color: ${({ theme }) => theme.colors.border.white};

  color: ${({ theme, variant = "primary" }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.text.secondary;
      case "danger":
        return theme.colors.text.error;
      case "success":
        return theme.colors.text.success;
      case "warning":
        return theme.colors.text.warning;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`}
  flex-wrap: wrap;
  gap: ${({ theme }) => `${theme.spacing.md}`};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => `${theme.fontSize["2xl"]}`};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  $iconOnly?: boolean;
}>`
  /* padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`}; */
  padding: ${({ $iconOnly, theme }) =>
    $iconOnly ? "4px" : `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid #d1d5db;
  border-color: ${({ theme }) => theme.colors.border.white};
  border-radius: ${({ $iconOnly, theme }) =>
    $iconOnly ? theme.borderRadius.full : theme.borderRadius.md};
  /* border-radius: ${({ theme }) => theme.borderRadius.md}; */
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
  cursor: pointer;
  /* min-height: 44px; */

  min-height: ${({ $iconOnly }) => ($iconOnly ? "auto" : "44px")};
  width: ${({ $iconOnly }) => ($iconOnly ? "auto" : "auto")};
  line-height: 1;

  background-color: ${({ theme, variant = "primary" }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.background.secondary;
      case "danger":
        return theme.colors.background.error;
      case "success":
        return theme.colors.background.success;
      case "warning":
        return theme.colors.background.warning;
      default:
        return theme.colors.background.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  min-width: 36px;
  min-height: 36px;

  &:hover {
    opacity: 0.7;
  }
`;

export const SearchInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid #d1d5db;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  min-width: 200px;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const FilterSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid #d1d5db;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  min-height: 44px;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.primary};

  &:focus {
    outline: none;
    border-color: #${({ theme }) => theme.colors.border.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Select = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid #d1d5db;
  border-color: #${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  min-height: 44px;
  background-color: ${({ theme }) => theme.colors.background};

  &:focus {
    outline: none;
    border-color: #${({ theme }) => theme.colors.border.warning};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid #d1d5db;
  border-color: #${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #${({ theme }) => theme.colors.border.warning};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid #d1d5db;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.background.primary : theme.colors.background.warning};
  color: ${({ $active }) => ($active ? "white" : "#374151")};
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.background : theme.colors.background.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

export const ModalHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid #e5e7eb;
  border-bottom-color: ${({ theme }) => theme.colors.border.primary};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: ${({ theme }) => `${theme.fontSize.lg}`};
  font-weight: 600;
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ModalFooter = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid #e5e7eb;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

//--------------------------------------------------------------------------------------------------------------------------

export const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

//--------------------------------------------------------------------------------------------------------------------------

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

//--------------------------------------------------------------------------------------------------------------------------
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.5rem;
`;

//--------------------------------------------------------------------------------------------------------------------------

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Input = styled.input`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid #d1d5db;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-color :  ${({ theme }) => theme.colors.border.primary});
    font-size: ${({ theme }) => theme.fontSize.base};
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border.warning})
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

//--------------------------------------------------------------------------------------------------------------------------

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid #e5e7eb;
  border-color :  ${({ theme }) => theme.colors.border});
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Td = styled.td`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid #f3f4f6;
  border-color :  ${({ theme }) => theme.colors.border.primary});
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Tbody = styled.tbody``;
//--------------------------------------------------------------------------------------------------------------------------

export const StatusBadge = styled.span<{ $status: number }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;

  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case 0:
        return theme.colors.background.secondary;
      case 1:
        return theme.colors.background.success;
      case 2:
        return theme.colors.background.warning;
      case 3:
        return theme.colors.background.error;
      default:
        return theme.colors.background.primary;
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 0:
        return theme.colors.text.secondary;
      case 1:
        return theme.colors.text.success;
      case 2:
        return theme.colors.text.warning;
      case 3:
        return theme.colors.text.error;
      default:
        return theme.colors.text.primary;
    }
  }};
`;
//--------------------------------------------------------------------------------------------------------------------------
export const CategoryBadge = styled.span<{ $category: number }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;

  background-color: ${({ theme, $category }) => {
    switch ($category) {
      case 0:
        return theme.colors.background.secondary;
      case 1:
        return theme.colors.background.success;
      case 2:
        return theme.colors.background.warning;
      case 3:
        return theme.colors.background.error;
      default:
        return theme.colors.background.primary;
    }
  }};
  color: ${({ theme, $category }) => {
    switch ($category) {
      case 0:
        return theme.colors.text.secondary;
      case 1:
        return theme.colors.text.success;
      case 2:
        return theme.colors.text.warning;
      case 3:
        return theme.colors.text.error;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;
