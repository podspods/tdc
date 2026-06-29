import styled from "styled-components";

const InfoGroup = styled.div`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    padding-right: ${({ theme }) => theme.spacing.md};
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-right: none;
      text-align: right;
    }
  }
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.warning};
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export type BadgeProps = {
  label?: string;
  value: number | string | Date | boolean;
};
export default function Badge({ ...props }: BadgeProps) {
  return (
    <>
      <InfoGroup>
        <h1>Badge</h1>
        <Value>{props.value.toString()}</Value>
        <Label>{props.label} </Label>
      </InfoGroup>
    </>
  );
}
