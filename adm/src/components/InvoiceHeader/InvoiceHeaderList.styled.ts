import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #1f2937;
  margin: 0;
`;

export const AddButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  min-height: 44px;

  &:hover {
    background-color: #1d4ed8;
  }
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
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: #f9fafb;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $active }) => ($active ? "#dcfce7" : "#fee2e2")};
  color: ${({ $active }) => ($active ? "#166534" : "#991b1b")};
`;

export const DefaultBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: #fef3c7;
  color: #92400e;
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

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;
