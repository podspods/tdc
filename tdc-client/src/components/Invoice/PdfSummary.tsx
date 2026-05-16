import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../common/common";
import type { InvoiceLine } from "./invoice.types";

export type PdfSummaryProps = {
  taskList: InvoiceLine[];

  sparePartList: InvoiceLine[];
  consumableList: InvoiceLine[];
  taxRate: number;
};

function buildSumString(a?: number, b?: number, c?: number): string {
  const parts = [a, b, c].filter((v) => v && v !== 0).map(String);
  return parts.join("\n+ ");
}

export default function PdfSummary({ ...props }: PdfSummaryProps) {
  const { t } = useTranslation(["invoice"]);
  const subtotalTaskBeforeDiscount =
    props.taskList?.reduce((sum, item) => sum + item.unitPrice, 0) ?? 0;
  const subtotalSparePartBeforeDiscount =
    props.sparePartList?.reduce((sum, item) => sum + item.unitPrice, 0) ?? 0;
  const subtotalConsumableBeforeDiscount =
    props.consumableList?.reduce((sum, item) => sum + item.unitPrice, 0) ?? 0;

  const partAndLabor = buildSumString(
    subtotalTaskBeforeDiscount,
    subtotalSparePartBeforeDiscount,
    subtotalConsumableBeforeDiscount,
  );

  const subtotalTaskDiscount =
    props.taskList?.reduce((sum, item) => sum + item.unitPrice * item.discountRate, 0) ?? 0;
  const subtotalSparePartDiscount =
    props.sparePartList?.reduce((sum, item) => sum + item.unitPrice * item.discountRate, 0) ?? 0;
  const subtotalConsumableDiscount =
    props.consumableList?.reduce((sum, item) => sum + item.unitPrice * item.discountRate, 0) ?? 0;
  const discountRate = buildSumString(
    subtotalTaskDiscount,
    subtotalSparePartDiscount,
    subtotalConsumableDiscount,
  );

  return (
    <>
      <Text style={styles.sectionTitle}>{t("summary")}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.colDesc}>{t("parts&labor")}</Text>
          <Text style={styles.colAmount}>{partAndLabor}</Text>
          <Text style={styles.colAmount}>
            {formatCurrency(
              subtotalTaskBeforeDiscount +
                subtotalSparePartBeforeDiscount +
                subtotalConsumableBeforeDiscount,
            )}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.colDesc}>{t("discount")}</Text>
          <Text style={styles.colAmount}>{discountRate}</Text>
          <Text style={styles.colAmount}>
            {formatCurrency(
              subtotalTaskDiscount + subtotalSparePartDiscount + subtotalConsumableDiscount,
            )}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.colDesc}>{t("subtotal")}</Text>
          <Text style={styles.colAmount}></Text>
          <Text style={styles.colAmount}>
            {formatCurrency(
              subtotalTaskBeforeDiscount +
                subtotalSparePartBeforeDiscount +
                subtotalConsumableBeforeDiscount -
                subtotalTaskDiscount -
                subtotalSparePartDiscount -
                subtotalConsumableDiscount,
            )}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.colDesc}>{t("vat")}</Text>
          <Text style={styles.colAmount}>{(props.taxRate * 100).toFixed(0)}%</Text>
          <Text style={styles.colAmount}>
            {formatCurrency(
              (subtotalTaskBeforeDiscount +
                subtotalSparePartBeforeDiscount +
                subtotalConsumableBeforeDiscount -
                subtotalTaskDiscount -
                subtotalSparePartDiscount -
                subtotalConsumableDiscount) *
                props.taxRate,
            )}
          </Text>
        </View>
        <View style={styles.tableTotalRow}>
          <Text style={styles.colDesc}>{t("grandTotal")}</Text>
          <Text style={styles.colAmount}></Text>
          <Text style={styles.colTotal}>
            {formatCurrency(
              subtotalTaskBeforeDiscount +
                subtotalSparePartBeforeDiscount +
                subtotalConsumableBeforeDiscount -
                subtotalTaskDiscount -
                subtotalSparePartDiscount -
                subtotalConsumableDiscount +
                (subtotalTaskBeforeDiscount +
                  subtotalSparePartBeforeDiscount +
                  subtotalConsumableBeforeDiscount -
                  subtotalTaskDiscount -
                  subtotalSparePartDiscount -
                  subtotalConsumableDiscount) *
                  props.taxRate,
            )}
          </Text>
        </View>
      </View>
    </>
  );
}
