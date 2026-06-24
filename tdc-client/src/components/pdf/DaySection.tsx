import { Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { daySectionStyles } from "./styles";
import { useTranslation } from "react-i18next";

export type DaySectionProps = {
  issueDate: Date;
  dueDate: Date;
};
export default function DaySection({ ...props }: DaySectionProps) {
  const { t } = useTranslation(["invoice"]);
  return (
    <View style={daySectionStyles.mainContainer}>
      <Text style={daySectionStyles.issueDate}>
        {t("issueDate")} {moment(props.issueDate).format("DD/MM/YYYY")}
      </Text>
      <Text style={daySectionStyles.dueDate}>
        {t("dueDate")} {moment(props.issueDate).format("DD/MM/YYYY")}
      </Text>
    </View>
  );
}
