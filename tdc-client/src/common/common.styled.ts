import styled from "styled-components";
import type { Status } from "./commun.types";

export const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #1f2937;
  margin: 0;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
}>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  background-color: ${({ variant }) =>
    variant === "primary"
      ? "#2563eb"
      : variant === "secondary"
        ? "#6b7280"
        : variant === "danger"
          ? "#ef4444"
          : variant === "success"
            ? "#10b981"
            : variant === "warning"
              ? "#f59e0b"
              : "#2563eb"};
  color: white;

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
  font-size: 18px;
  padding: 4px 8px;
  min-width: 36px;
  min-height: 36px;

  &:hover {
    opacity: 0.7;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? "#2563eb" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#374151")};
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) => ($active ? "#1d4ed8" : "#f3f4f6")};
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
  background-color: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

//--------------------------------------------------------------------------------------------------------------------------

// export const Card = styled.div`
//   background-color: white;
//   border-radius: 12px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   margin-bottom: 24px;
//   overflow: hidden;
// `;

// export const CardHeader = styled.div`
//   padding: 16px 20px;
//   border-bottom: 1px solid #e5e7eb;
//   background-color: #f9fafb;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 12px;
// `;

// export const CardTitle = styled.h2`
//   font-size: 18px;
//   font-weight: 600;
//   color: #1f2937;
//   margin: 0;
// `;

// export const CardContent = styled.div`
//   padding: 20px;
// `;

export const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray50};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
//--------------------------------------------------------------------------------------------------------------------------

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

//--------------------------------------------------------------------------------------------------------------------------

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  background-color: #f9fafb;
`;

export const Td = styled.td`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1f2937;
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: #f9fafb;
  }
`;

export const Thead = styled.thead`
  background-color: #f9fafb;
`;

export const Tbody = styled.tbody``;
//--------------------------------------------------------------------------------------------------------------------------

export const StatusBadge = styled.span<{ $status: number }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $status }) =>
    $status === 0
      ? "#dcfce7"
      : $status === 1
        ? "#fef3c7"
        : $status === 2
          ? "#fee2e2"
          : $status === 3
            ? "#dbeafe"
            : "#f3f4f6"};
  color: ${({ $status }) =>
    $status === 0
      ? "#166534"
      : $status === 1
        ? "#92400e"
        : $status === 2
          ? "#991b1b"
          : $status === 3
            ? "#1e40af"
            : "#374151"};
`;
//--------------------------------------------------------------------------------------------------------------------------

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;
