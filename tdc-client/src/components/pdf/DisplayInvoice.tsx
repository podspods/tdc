import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { invoiceStyles, pageStyles, pdfStyles } from "./styles";
import type { InvoiceDisplay } from "../invoice/types";
import Garage from "./Garage";
import Owner from "./Owner";
import Vehicle from "./Vehicle";
import DaySection from "./DaySection";
import LineSection from "./LineSection";
import Agreement from "./Agreement";
import regularFont from "../../assets/fonts/BeVietnamPro-Regular.ttf";
import italicFont from "../../assets/fonts/BeVietnamPro-Italic.ttf";
import boldFont from "../../assets/fonts/BeVietnamPro-Bold.ttf?url";
// import emojiFont from "../../assets/fonts/NotoColorEmoji-Regular.ttf?url";

// Font.register({
//   family: "Emoji",
//   fonts: [{ src: emojiFont, fontWeight: 400, fontStyle: "normal" }],
// });

Font.register({
  family: "Be Vietnam Pro",
  fonts: [
    { src: regularFont, fontWeight: 400, fontStyle: "normal" },
    { src: italicFont, fontWeight: 400, fontStyle: "italic" },
    { src: boldFont, fontWeight: 700, fontStyle: "normal" },
  ],
});

export type DisplayInvoiceProps = {
  invoiceDisplay: InvoiceDisplay;
};
export default function DisplayInvoice({ ...props }: DisplayInvoiceProps) {
  return (
    <Document>
      <Page size="A4" style={[pageStyles.page]}>
        <Text style={{ fontFamily: "Helvetica" }}></Text>
        <View style={pageStyles.mainContainer}>
          <View style={pageStyles.headerContainer}>
            <View style={pageStyles.leftColumn}>
              <Garage value={props.invoiceDisplay.garage} />
            </View>
            <View style={pageStyles.rightColumn}>
              <Owner value={props.invoiceDisplay.vehicleInfo.owner} />
              <Vehicle value={props.invoiceDisplay.vehicleInfo} />
              <DaySection
                issueDate={props.invoiceDisplay.invoice.issueDate}
                dueDate={props.invoiceDisplay.invoice.dueDate}
              />
              <Text style={invoiceStyles.invoiceNumber}>
                {props.invoiceDisplay.invoice.invoiceNumber}
              </Text>
            </View>
          </View>

          <View style={pageStyles.bodyContainer}>
            <LineSection invoiceDisplay={props.invoiceDisplay} />
          </View>
          <Agreement />
        </View>
      </Page>
    </Document>
  );
}

// const InvoiceHeader = styled(TwoHalfPage)``;
// const InvoiceLineDiv = styled.div``;
