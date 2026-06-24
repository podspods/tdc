import { useTranslation } from "react-i18next";
import { Text, View } from "@react-pdf/renderer";
import { agreementStyles } from "./styles";

export type AgreementProps = {};
export default function Agreement({ ...props }: AgreementProps) {
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

// const GarageRepresentative = styled(LeftSide)`
//   padding: ${({ theme }) => `${theme.spacing.sm} `};
//   background-color: ${({ theme }) => theme.colors.background.white};
//   border: 1px solid red;
//   border-radius: ${({ theme }) => theme.spacing.sm};
//   min-height: 10rem;
// `;

// const Customer = styled(GarageRepresentative)``;
