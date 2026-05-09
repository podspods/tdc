// src/components/Invoice/InvoicePDF.tsx
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import type { GarageInfo, InvoiceData } from "./invoice.types";
import type { CreateOwnerDto } from "../owner/owner.types";
// import myFont from "/src/assets/fonts/BeVietnamPro-Regular.ttf";
import regularFont from "../../assets/fonts/BeVietnamPro-Regular.ttf";
import italicFont from "../../assets/fonts/BeVietnamPro-Italic.ttf";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Be Vietnam Pro" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  leftColumn: { flex: 1 },
  rightColumn: { flex: 1, alignItems: "flex-end" },
  title: { fontSize: 24, marginBottom: 20 },
  logo: { width: 60, marginRight: 15 },
  garageName: { fontSize: 18, fontWeight: "bold" },
  garageDetails: { fontSize: 10, color: "#666", marginTop: 5 },

  ownerName: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  ownerDetails: { fontSize: 10, color: "#333", marginTop: 2 },
});

Font.register({
  family: "Be Vietnam Pro",
  fonts: [
    { src: regularFont, fontWeight: 400, fontStyle: "normal" },
    { src: italicFont, fontWeight: 400, fontStyle: "italic" },
  ],
});
export type ToPdfProps = {
  garage: GarageInfo;
  owner: CreateOwnerDto;
  data: InvoiceData;
};

export default function ToPdf({ ...props }: ToPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with logo and garage name */}
        <View style={styles.headerContainer}>
          {props.garage.logoUrl && <Image src={props.garage.logoUrl} style={styles.logo} />}
          <View style={styles.leftColumn}>
            <Text style={styles.garageName}>{props.garage.name}</Text>
            <Text style={styles.garageDetails}>{props.garage.address}</Text>
            <Text style={styles.garageDetails}>Tel: {props.garage.phone}</Text>
            {props.garage.email && (
              <Text style={styles.garageDetails}>Email: {props.garage.email}</Text>
            )}
            {props.garage.taxCode && (
              <Text style={styles.garageDetails}>Tax ID: {props.garage.taxCode}</Text>
            )}
          </View>
          {/* Right column – Owner (client) info */}
          <View style={styles.rightColumn}>
            <Text style={styles.ownerName}>Customer Information</Text>
            <Text style={styles.ownerDetails}>
              {props.owner.firstName} {props.owner.lastName}
            </Text>
            <Text style={styles.ownerDetails}>Tel: {props.owner.phoneNumber}</Text>
            {props.owner.email && (
              <Text style={styles.ownerDetails}>Email: {props.owner.email}</Text>
            )}
            {props.owner.address && (
              <Text style={styles.ownerDetails}>Address: {props.owner.address}</Text>
            )}
          </View>
        </View>

        {/* Rest of the invoice content */}
        <Text>Invoice #{props.data.invoiceNumber}</Text>
        <Text>Date: {props.data.date}</Text>
        <Text>Client: {props.data.clientName}</Text>
        <Text>Total: {props.data.total.toLocaleString()} VND</Text>
      </Page>
    </Document>
  );
}
