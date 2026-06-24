import styled from "styled-components";

export const Code = styled.span`
  font-size: 0.75rem;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 20px;
  color: #4b5563;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ActionIcon = styled.button`
  background: none;
  border: none;
  font-size: 0.1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 40px;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;

  &:hover {
    background: #f3f4f6;
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;
export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ $active }) => ($active ? "#dcfce7" : "#fee2e2")};
  color: ${({ $active }) => ($active ? "#166534" : "#991b1b")};
`;

export const Supplier = styled.div`
  margin-top: 8px;
  font-size: 0.85rem;
  color: #4b5563;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
