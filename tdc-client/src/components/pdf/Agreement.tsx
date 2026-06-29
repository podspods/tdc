import { useTranslation } from "react-i18next";
import { Text, View } from "@react-pdf/renderer";
import { agreementStyles } from "./styles";

export default function Agreement() {
  const { t } = useTranslation(["invoice"]);

  return (
    <View style={agreementStyles.mainContainer}>
      <Text style={agreementStyles.title}>{t("agreement")}</Text>

      <View style={agreementStyles.explain}>
        <Text>{t("discountReason")}</Text>
        <Text>{t("paymentMethod")}</Text>
        <Text>{t("warranty")}</Text>
      </View>
      <View style={agreementStyles.twoHalf}>
        <View style={agreementStyles.half}>
          <Text>{t("garageRepresentative")}</Text>
        </View>
        <View style={agreementStyles.half}>
          <Text>{t("customer")}</Text>
        </View>
      </View>
    </View>
  );
}
