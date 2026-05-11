import type { CreateOwnerDto } from "../owner/owner.types";
import type { GarageInfo } from "./invoice.types";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import { useTranslation } from "react-i18next";

export type PdfHeaderProps = {
  garage: GarageInfo;
  owner: CreateOwnerDto;
  vehicleInfo: string;
  invoiceId: string;
  invoiceDate?: string;
};

export default function PdfHeader({ ...props }: PdfHeaderProps) {
  const { t } = useTranslation(["invoice"]);

  const idAndDate = props.invoiceDate
    ? `${t("invoice")}: ${props.invoiceId}  ${t("issuedOn")}: ${props.invoiceDate}`
    : `${t("invoice")}: ${props.invoiceId}  ${t("issuedOn")}: ${new Date().toLocaleDateString()}`;
  return (
    <>
      <View style={styles.headerContainer}>
        {props.garage.logoUrl && <Image src={props.garage.logoUrl} style={styles.logo} />}
        <View style={styles.leftColumn}>
          <Text style={styles.garageName}>{props.garage.name}</Text>
          <Text style={styles.garageDetails}>{props.garage.address}</Text>
          <Text style={styles.garageDetails}>{props.garage.city}</Text>
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
          <Text style={styles.ownerName}>
            {props.owner.firstName} {props.owner.lastName}
          </Text>
          {props.owner.address && <Text style={styles.ownerDetails}>{props.owner.address}</Text>}
          {props.owner.city && <Text style={styles.ownerDetails}>{props.owner.city}</Text>}
          <Text style={styles.ownerDetails}>{props.owner.phoneNumber}</Text>
          {props.owner.email && <Text style={styles.ownerDetails}>{props.owner.email}</Text>}
          <Text style={styles.vehicleDetails}>{props.vehicleInfo}</Text>
          <Text style={styles.vehicleDetails}>{idAndDate}</Text>
        </View>
      </View>
    </>
  );
}
