import styled from "styled-components";

export const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  &:hover {
    background-color: #f9fafb;
  }
`;

export const Td = styled.td`
  padding: 12px 8px;
  vertical-align: middle;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;
