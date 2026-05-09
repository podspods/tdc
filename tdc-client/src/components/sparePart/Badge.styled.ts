import styled from "styled-components";

// Styled components (mobile‑first)
export const Card = styled.div<{ id?: string }>`
  width: 300px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px;
  // margin: 0 12px 16px 12px;
  margin: 0;
  transition: all 0.2s;

  @media (min-width: 768px) {
    margin: 0 0 20px 0;

    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 1.35rem;
  }
`;

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

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 16px 0;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const ZLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
  min-width: 100px;
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: help;
  font-weight: 500;
  color: #6b7280;
  min-width: 100px;
`;

export const Value = styled.span`
  color: #1f2937;
  word-break: break-word;
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
