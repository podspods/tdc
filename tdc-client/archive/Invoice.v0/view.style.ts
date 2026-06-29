import styled from "styled-components";

export const MainContainer = styled.div<{ lineType: number }>`
  border: 1px solid red;
  border-radius: ${({ theme }) => `${theme.spacing.sm}`};
  flex-wrap: wrap;
  padding: ${({ theme }) => `${theme.spacing.md}`};
  margin: ${({ theme }) => `${theme.spacing.xs}`};
  gap: ${({ theme }) => `${theme.spacing.md}`};

  background-color: ${({ theme, lineType }) => {
    switch (lineType) {
      case 0:
        return theme.softColor._000;
      case 1:
        return theme.softColor._100;
      case 2:
        return theme.softColor._200;
      case 3:
        return theme.softColor._300;
      case 4:
        return theme.softColor._400;
      default:
        return theme.softColor._500;
    }
  }};
`;

export const LineTitle = styled.div`
  width: 100%;
  background-color: ${({ theme }) => `${theme.colors.background.warning}`};
  border-radius: ${({ theme }) => `${theme.borderRadius.sm}`};
`;
export const TextAlignLeft = styled.div`
  text-align: left;
  overflow-x: auto;
`;
export const NumberAligneRight = styled.div`
  text-align: right;
  overflow-x: auto;
`;

export const Id = styled(TextAlignLeft)`
  width: 10%;
`;
export const Description = styled(TextAlignLeft)`
  width: 32%;
`;
export const Quantity = styled(NumberAligneRight)`
  width: 8%;
`;
export const Gross = styled(NumberAligneRight)`
  width: 19%;
`;
export const Discount = styled(NumberAligneRight)`
  width: 12%;
`;
export const Net = styled(NumberAligneRight)`
  width: 19%;
`;

export const MainSubject = styled.div`
  border: 1px solid black;
  background-color: ${({ theme }) => `${theme.colors.background.primary}`};
  border-radius: ${({ theme }) => `${theme.borderRadius.sm}`};
  padding: ${({ theme }) => `${theme.spacing.sm} `};
  margin: ${({ theme }) => `${theme.spacing.xs} 0`};
`;

export const TwoHalfPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSide = styled.div`
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RightSide = styled(LeftSide)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
