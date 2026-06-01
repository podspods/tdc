import styled from "styled-components";

// Styled components for mobile cards (à placer avant le composant)
export const MobileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    display: none; /* Cacher sur desktop */
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Permet le passage à la ligne */
  gap: 0.5rem; /* Espace vertical quand les éléments se replient */
  align-items: baseline;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

export const CardLabel = styled.span`
  font-weight: 600;
  color: #4b5563;
  min-width: 110px;
`;

export const CardValue = styled.span`
  color: #1f2937;
  word-break: break-word;
  text-align: right;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
`;

export const DesktopTable = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;
