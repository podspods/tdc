// src/components/Invoice/InvoicePDF.tsx
import { Document, Page, Font, View, Text } from "@react-pdf/renderer";
import regularFont from "../../assets/fonts/BeVietnamPro-Regular.ttf";
import italicFont from "../../assets/fonts/BeVietnamPro-Italic.ttf";
import boldFont from "../../assets/fonts/BeVietnamPro-Bold.ttf";
import { styles } from "./Pdf.styles";
import PdfHeader from "./PdfHeader";
import PdfAgreement from "./PdfAgreement";
import PdfSummary from "./PdfSummary";
import PdfTab from "./PdfTab";
import { useTranslation } from "react-i18next";
import { getConsumablelist, getHeader, getSparePartList, getTaskList } from "./pdf.function";
import HeaderPage from "./Pdf.headerPage";
import FooterPage from "./Pdf.FooterPage";

Font.register({
  family: "Be Vietnam Pro",
  fonts: [
    { src: regularFont, fontWeight: 400, fontStyle: "normal" },
    { src: italicFont, fontWeight: 400, fontStyle: "italic" },
    { src: boldFont, fontWeight: 700, fontStyle: "normal" },
  ],
});
export type ToPdfProps = {
  invoiceDbId: number;
};

export default function ToPdf({ ...props }: ToPdfProps) {
  const { t } = useTranslation(["invoice"]);
  const header = getHeader(props.invoiceDbId);
  const taskList = getTaskList(props.invoiceDbId);
  const sparePartList = getSparePartList(props.invoiceDbId);
  const consumableList = getConsumablelist(props.invoiceDbId);
  const taxRate = 0.1;

  return (
    <Document>
      <Page size="A4" style={[styles.page]}>
        {/* Header with logo and garage name */}
        <HeaderPage header={header} />
        <View style={[styles.content]}>
          <PdfHeader
            garage={header.garage}
            owner={header.owner}
            vehicleInfo={header.vehicleInfo}
            invoiceId={header.invoiceId}
          />
          <PdfTab rowlist={taskList} title={t("servicesPerformed")} section={1} />
          <PdfTab rowlist={sparePartList} title={t("spareParts")} section={2} />
          <PdfTab rowlist={consumableList} title={t("consumable")} section={3} />
          <PdfSummary
            taskList={taskList}
            sparePartList={sparePartList}
            consumableList={consumableList}
            taxRate={taxRate}
          />
          <PdfAgreement />
        </View>
        <FooterPage header={header} />
      </Page>
    </Document>
  );
}
