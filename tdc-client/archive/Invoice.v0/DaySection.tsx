import moment from "moment";
import { Input } from "../UI/Input";
import { TwoHalfPage } from "./view.style";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export type DaySectionProps = {
  editMode?: boolean;
  issueDate: Date;
  dueDate: Date;
  handleIssueDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDueDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function DaySection({ ...props }: DaySectionProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <MainContainer>
      <Input
        fontSize="0.7rem"
        width="46%"
        readOnly={!props.editMode}
        label={t("issueDate")}
        type="date"
        value={moment(props.issueDate).format("YYYY-MM-DD")}
        onChange={props.handleIssueDateChange}
      />
      <Input
        fontSize="0.7rem"
        width="46%"
        readOnly={!props.editMode}
        label={t("dueDate")}
        type="date"
        value={moment(props.dueDate).format("YYYY-MM-DD")}
        onChange={props.handleDueDateChange}
      />
    </MainContainer>
  );
}

const MainContainer = styled(TwoHalfPage)`
  flex-direction: row;
`;
