import styled from "styled-components";

export const StickerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const StickerLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: help;
  padding: 0 20px;
`;

export const StickerValue = styled.span<{ $isVisible: boolean; $alert?: boolean }>`
  background-color: #f3f4f6;
  padding: 2px 4px;
  border-radius: 5px;
  display: inline-block;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    visibility 0.2s,
    opacity 0.2s;
  color: ${({ $alert }) => {
    if (!$alert) return "#1f2937"; // default dark gray text
    // Basic heuristic for light vs dark background (simplified)
    return "#ef4444";
  }};
  font-weight: 500;

  ${StickerRow}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
