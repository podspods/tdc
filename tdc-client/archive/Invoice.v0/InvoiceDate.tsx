import styled from "styled-components";
import moment from "moment";
import { useTranslation } from "react-i18next";

export const getDueDateStatus = (dueDate: Date | string): number => {
  const due = moment(dueDate).startOf("day");
  const today = moment().startOf("day");
  if (due.isAfter(today)) return 1;
  if (due.isSame(today)) return 0;
  return -1;
};

export type InvoiceDateProps = {
  issueDate: Date;
  dueDate: Date;
};
export default function InvoiceDate({ ...props }: InvoiceDateProps) {
  const { t } = useTranslation(["invoice"]);

  const status = getDueDateStatus(props.dueDate);
  const tooltipContent = `${t("issueDate")}: ${moment(props.issueDate).format("D/MM/YYYY")}\n${t("dueDate")}: ${moment(props.dueDate).format("D/MM/YYYY")}`;
  return (
    <MainContainer $status={status} title={tooltipContent}>
      <p>
        {`${moment(props.issueDate).format("DD/MM/YYYY")} -  ${moment(props.dueDate).format("DD/MM/YYYY")}`}
      </p>
    </MainContainer>
  );
}

const MainContainer = styled.div<{ $status: number }>`
  width: 100%;
  border: 1px solid red;
  border-radius: ${({ theme }) => `${theme.spacing.sm}`};
  padding: ${({ theme }) => `${theme.spacing.md}`};
  margin: ${({ theme }) => `${theme.spacing.xs}`};
  gap: ${({ theme }) => `${theme.spacing.md}`};

  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case 1:
        return theme.colors.background.error;
      case 0:
        return theme.colors.background.warning;
      default:
        return theme.colors.background.success;
    }
  }};
`;
