// src/components/invoice/InvoicePDF.tsx
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
import type { GroupedInvoiceLine, InvoiceLine } from "./types";
import type { Correspondance } from "../correspondance/types";

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
  invoiceLineList: InvoiceLine[];
  lineTypeList: Correspondance[];
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

          {lineTypeList.map((lineType) => (
            <InvoiceLineDetail
              key={lineType.id}
              lineType={lineType}
              invoiceId={props.invoiceId}
              editMode={props.editMode}
              refreshId={refreshId}
              setRefresh={handleRefresh}
            />
          ))}

          {props.lineTypeList.map((lineType) => (
            <PdfTab
              key={index}
              rowlist={record.lineList}
              title={t("record.code")}
              section={index + 1}
            />
          ))}

          <PdfSummary groupedInvoiceLineList={props.groupedInvoiceLineList} />
          <PdfAgreement />
        </View>
        <FooterPage header={props.header} />
      </Page>
    </Document>
  );
}
