// src/components/invoice/InvoiceCard.tsx
import React from "react";
import styled from "styled-components";
import { Button } from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import type { Invoice, InvoiceInfo } from "./invoice.types";

// Styled components for the card
const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.white};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

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

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
  }
`;

// Component props
interface InvoiceCardProps {
  invoice: InvoiceInfo;
  onGeneratePdf: (id: number) => void;
  onEdit: (id: number) => void;
  isGeneratingPdf: boolean;
  generatingId: number | null;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ ...props }) => {
  const { t } = useTranslation(["invoice"]);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("vi-VN");

  return (
    <Card>
      <InfoGroup>
        <Label>{t("id")}</Label>
        <Value>[{props.invoice.id}]</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("invoiceNumber")}</Label>
        <Value>{props.invoice.invoiceNumber}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("owner")}</Label>
        <Value>
          {props.invoice.ownerFirstName} {props.invoice.ownerLastName}
        </Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("vehicle")}</Label>
        <Value>
          {props.invoice.vehicleBrand} {props.invoice.vehicleModel} {props.invoice.vehicleColor}{" "}
          {props.invoice.vehicleplateNumber}
        </Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("dueDate")}</Label>
        <Value>{props.invoice.dueDate)}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("issueDate")}</Label>
        <Value>{formatDate(props.invoice.issueDate)}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>{t("status")}</Label>
        <Value>{props.invoice.statusText}</Value>
      </InfoGroup>
      <Actions>
        <Button
          variant="secondary"
          onClick={() => props.onGeneratePdf(props.invoice.id)}
          disabled={props.generatingId === props.invoice.id}
        >
          {props.generatingId === props.invoice.id ? t("generating...") : t("generatePDF")}
        </Button>
        <Button variant="primary" onClick={() => props.onEdit(props.invoice.id)}>
          🖍 {t("edit")}
        </Button>
      </Actions>
    </Card>
  );
};
