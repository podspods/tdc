import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import type { PdfHeader } from "./Pdf.types";

export type FooterPageProps = {
  header: PdfHeader;
};
export default function FooterPage({ ...props }: FooterPageProps) {
  const text: string = `${props.header.owner.firstName} ${props.header.owner.lastName} ${props.header.vehicleInfo}`;
  return (
    <>
      <View style={[styles.footerPage, styles.fdr, styles.jcb]} fixed>
        <Text>{text}</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            pageNumber > 0 ? `${pageNumber} / ${totalPages}` : null
          }
        />
      </View>
    </>
  );
}
