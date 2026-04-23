import styled from "styled-components";
import type { OwnerCategory, OwnerStatus } from "./owner.types";

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 20px;
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
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1f2937;
`;

export const StatusBadge = styled.span<{ $status: OwnerStatus }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $status }) =>
    $status === "active" ? "#dcfce7" : $status === "inactive" ? "#fef3c7" : "#fee2e2"};
  color: ${({ $status }) =>
    $status === "active" ? "#166534" : $status === "inactive" ? "#92400e" : "#991b1b"};
`;

export const CategoryBadge = styled.span<{ $category: OwnerCategory }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $category }) =>
    $category === "vip"
      ? "#fef3c7"
      : $category === "gold"
        ? "#fef3c7"
        : $category === "platinum"
          ? "#e0e7ff"
          : $category === "important"
            ? "#dbeafe"
            : "#f3f4f6"};
  color: ${({ $category }) =>
    $category === "vip"
      ? "#92400e"
      : $category === "gold"
        ? "#92400e"
        : $category === "platinum"
          ? "#1e40af"
          : $category === "important"
            ? "#1e40af"
            : "#374151"};
`;

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

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;
