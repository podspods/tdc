import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import { useTranslation } from "react-i18next";
import type { PdfRow } from "./Pdf.types";
import { formatCurrency } from "../../common/common";

export type PdfTabProps = {
  rowlist: PdfRow[];
  title: string;
  section: number;
};
export default function PdfTab({ ...props }: PdfTabProps) {
  const { t } = useTranslation(["invoice"]);
  const subtotalBeforeDiscount = props.rowlist?.reduce((sum, item) => sum + item.price, 0) ?? 0;

  const subtotalAfterDiscount =
    props.rowlist?.reduce((sum, item) => sum + item.price * (1 - item.discount), 0) ?? 0;

  return (
    <>
      <Text style={styles.sectionTitle}>{props.title}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colId}>{t("n°")}</Text>
          <Text style={styles.colDesc}>{t("description")}</Text>
          <Text style={styles.colQty}>{t("quantity")}</Text>
          <Text style={styles.colDiscount}>{t("discount")}</Text>
          <Text style={styles.colAmount}>{t("amount")}</Text>
        </View>
        {props.rowlist?.map.length &&
          props.rowlist?.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colId}>
                {props.section}.{item.id}
              </Text>
              <Text style={styles.colDesc}>{item.name}</Text>
              <Text style={styles.colQty}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colDiscount}>{(item.discount * 100).toFixed(0)}%</Text>
              <Text style={styles.colAmount}>
                {formatCurrency(item.price * (1 - item.discount))}
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
