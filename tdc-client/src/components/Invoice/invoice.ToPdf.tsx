// src/components/Invoice/InvoicePDF.tsx
import { Document, Page, Font, View } from "@react-pdf/renderer";
import regularFont from "../../assets/fonts/BeVietnamPro-Regular.ttf";
import italicFont from "../../assets/fonts/BeVietnamPro-Italic.ttf";
import boldFont from "../../assets/fonts/BeVietnamPro-Bold.ttf";
import { styles } from "./Pdf.styles";
import PdfAgreement from "./PdfAgreement";
import PdfSummary from "./PdfSummary";
import PdfTab from "./PdfTab";
import { useTranslation } from "react-i18next";
import HeaderPage from "./Pdf.headerPage";
import FooterPage from "./Pdf.FooterPage";
import { type PdfDataHeader } from "./Pdf.types";
import PdfHeader from "./PdfHeader";
import type { InvoiceLine } from "./invoice.types";

Font.register({
  family: "Be Vietnam Pro",
  fonts: [
    { src: regularFont, fontWeight: 400, fontStyle: "normal" },
    { src: italicFont, fontWeight: 400, fontStyle: "italic" },
    { src: boldFont, fontWeight: 700, fontStyle: "normal" },
  ],
});
export type ToPdfProps = {
  header: PdfDataHeader;
  taskList: InvoiceLine[];
  sparePartList: InvoiceLine[];
  consumableList: InvoiceLine[];
};

export default function ToPdf({ ...props }: ToPdfProps) {
  const { t } = useTranslation(["invoice"]);
  return (
    <Document>
      <Page size="A4" style={[styles.page]}>
        {/* Header with logo and garage name */}
        <HeaderPage header={props.header} />
        <View style={[styles.content]}>
          <PdfHeader header={props.header} />
          {props.taskList.length && (
            <PdfTab rowlist={props.taskList} title={t("servicesPerformed")} section={1} />
          )}
          {props.sparePartList.length && (
            <PdfTab rowlist={props.sparePartList} title={t("spareParts")} section={2} />
          )}
          {props.consumableList.length && (
            <PdfTab rowlist={props.consumableList} title={t("consumable")} section={3} />
          )}
          <PdfSummary
            taskList={props.taskList}
            sparePartList={props.sparePartList}
            consumableList={props.consumableList}
            taxRate={props.header.garage.taxRate}
          />
          <PdfAgreement />
        </View>
        <FooterPage header={props.header} />
      </Page>
    </Document>
  );
}
