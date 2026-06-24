import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import { useTranslation } from "react-i18next";

export type PdfAgreementProps = {};
export default function PdfAgreement({ ...props }: PdfAgreementProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <>
      <Text style={styles.sectionTitle}>{t("agreement")}</Text>
      <Text style={styles.standard}>{t("discountReason")}</Text>
      <Text style={styles.standard}>{t("paymentMethod")}</Text>
      <Text style={styles.standard}>{t("warranty")}</Text>
      <View style={styles.agreementContainer}>
        <View style={[styles.leftColumn, styles.b1, styles.br4, styles.m10]}>
          <Text style={[styles.standard, styles.center, styles.h100]}>
            {t("garageRepresentative")}
          </Text>
        </View>
        <View style={[styles.rightColumn, styles.b1, styles.br4, styles.m10]}>
          <Text style={[styles.standard, styles.center, styles.h100]}>{t("customer")}</Text>
        </View>
      </View>
    </>
  );
}
