import { Text, View } from "@react-pdf/renderer";
import { headerLine, totalLine } from "../../common/constant";
import { lineTypeSectionStyles } from "./styles";
import { useTranslation } from "react-i18next";
import type { InvoiceLine } from "../invoice/types";
import { formatNumber } from "../../common/common";

export type BadgeLineProps = {
  value: InvoiceLine;
  index: number;
  typeLine: number;
};

export default function BadgeLine({ ...props }: BadgeLineProps) {
  const { t } = useTranslation(["invoice"]);

  //--------------------------------------------------------------------------------------------------------------------------

  const renderContent = () => {
    switch (props.typeLine) {
      case headerLine: // en-tête des colonnes
        return (
          <View style={lineTypeSectionStyles.lineContainer}>
            <Text style={lineTypeSectionStyles.id}>{t("n°")}</Text>
            <Text style={lineTypeSectionStyles.description}>{t("description")}</Text>
            <Text style={lineTypeSectionStyles.quantity}>{t("quantity")}</Text>
            <Text style={lineTypeSectionStyles.gross}>{t("grossPrice")}</Text>
            <Text style={lineTypeSectionStyles.discount}>{t("discountRate")}</Text>
            <Text style={lineTypeSectionStyles.net}>{t("amount")}</Text>
          </View>
        );
      case totalLine: // ligne de total général
        return (
          <View style={lineTypeSectionStyles.lineContainer}>
            <Text style={lineTypeSectionStyles.id}></Text>
            <Text style={lineTypeSectionStyles.description}>{t("subtotal")}</Text>
            <Text style={lineTypeSectionStyles.quantity}></Text>
            <Text style={lineTypeSectionStyles.gross}>
              {formatNumber(props.value.unitPrice)} {t("currency")}
            </Text>
            <Text style={lineTypeSectionStyles.discount}></Text>
            <Text style={lineTypeSectionStyles.net}>
              {formatNumber(props.value.amount)} {t("currency")}
            </Text>
          </View>
        );
      default: // ligne normale de détail
        return (
          <View style={lineTypeSectionStyles.lineContainer}>
            <Text style={lineTypeSectionStyles.id}> {`${props.typeLine}.${props.index}`}</Text>
            <Text style={lineTypeSectionStyles.description}>
              {t(`partAndLaborDb:${props.value.description}`)}
            </Text>
            <Text style={lineTypeSectionStyles.quantity}> {props.value.quantity} </Text>
            <Text style={lineTypeSectionStyles.gross}>
              {formatNumber(props.value.unitPrice)} {t("currency")}
            </Text>
            <Text style={lineTypeSectionStyles.discount}>
              {props.value.discountRate > 0 ? `${props.value.discountRate} %` : ""}
            </Text>
            <Text style={lineTypeSectionStyles.net}>
              {formatNumber(props.value.amount)} {t("currency")}
            </Text>
          </View>
        );
    }
  };

  return <>{renderContent()}</>;
}
