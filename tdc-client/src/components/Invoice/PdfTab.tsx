import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../common/common";
import type { InvoiceLine } from "./invoice.types";

export type PdfTabProps = {
  rowlist: InvoiceLine[];
  title: string;
  section: number;
};
export default function PdfTab({ ...props }: PdfTabProps) {
  const { t } = useTranslation(["invoice"]);
  const subtotalBeforeDiscount = props.rowlist?.reduce((sum, item) => sum + item.unitPrice, 0) ?? 0;

  const subtotalAfterDiscount =
    props.rowlist?.reduce((sum, item) => sum + item.unitPrice * (1 - item.discountRate), 0) ?? 0;

  return (
    <>
      <Text style={styles.sectionTitle}>{props.title}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colId}>{t("n°")}</Text>
          <Text style={styles.colDesc}>{t("description")}</Text>
          <Text style={styles.colQty}>{t("grossPrice")}</Text>
          <Text style={styles.colDiscount}>{t("discountRate")}</Text>
          <Text style={styles.colAmount}>{t("amount")}</Text>
        </View>
        {props.rowlist?.map.length &&
          props.rowlist?.map((item, linenumber) => (
            <View key={item.lineId} style={styles.tableRow}>
              <Text style={styles.colId}>
                {props.section}.{linenumber + 1}
              </Text>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.colDiscount}>{(item.discountRate * 100).toFixed(0)}%</Text>
              <Text style={styles.colAmount}>
                {formatCurrency(item.unitPrice * (1 - item.discountRate))}
              </Text>
            </View>
          ))}
        <View style={styles.tableRow}>
          <Text style={styles.colId}></Text>
          <Text style={styles.colDesc}>{t("subtotal")}</Text>
          <Text style={styles.colQty}>{formatCurrency(subtotalBeforeDiscount)}</Text>
          <Text style={styles.colDiscount}></Text>
          <Text style={styles.colAmount}>{formatCurrency(subtotalAfterDiscount)}</Text>
        </View>
      </View>
    </>
  );
}
