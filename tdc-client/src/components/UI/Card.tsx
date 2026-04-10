import styled from "styled-components";

export const Card = styled.div`
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
