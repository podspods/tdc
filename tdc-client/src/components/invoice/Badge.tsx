import styled from "styled-components";
import { type InvoiceInfo } from "./types";
import InvoiceDate from "./InvoiceDate";
import ActionBar from "./ActionBar";
import type { ComponentStatus } from "../../common/commun.types";

export type BadgeProps = {
  invoice: InvoiceInfo;
  onStateChange: (state: ComponentStatus, invoice: InvoiceInfo) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus) => {
    console.log("handleAction 14", state);
    props.onStateChange(state, props.invoice);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const title: string = `invoiceId: [${props.invoice.id}]\nstatus: ${props.invoice.statusText}`;
  return (
    <MainContainer title={title} $status={props.invoice.statusCode}>
      <InvoiceNumber>{props.invoice.invoiceNumber}</InvoiceNumber>
      <InvoiceDate issueDate={props.invoice.issueDate} dueDate={props.invoice.dueDate} />
      <p>{`${props.invoice.ownerFirstName} ${props.invoice.ownerLastName}`}</p>
      <p>
        {`${props.invoice.vehicleBrand} - ${props.invoice.vehicleModel} - ${props.invoice.vehicleColor}`}
      </p>
      <p>[{props.invoice.vehiclePlateNumber}]</p>
      <ActionBar onAction={handleAction} />
    </MainContainer>
  );
}

const MainContainer = styled.div<{ $status: number }>`
  max-width: 350px;
  border: 1px solid red;
  border-radius: ${({ theme }) => `${theme.spacing.sm}`};
  flex-wrap: wrap;
  padding: ${({ theme }) => `${theme.spacing.md}`};
  margin: ${({ theme }) => `${theme.spacing.xs}`};
  gap: ${({ theme }) => `${theme.spacing.md}`};

  background-color: ${({ theme, $status }) => {
    switch ($status) {
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

const InvoiceNumber = styled.p`
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
  border-bottom: 1px solid black;
`;
