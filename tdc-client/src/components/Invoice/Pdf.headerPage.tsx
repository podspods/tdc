import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Pdf.styles";
import type { PdfHeader } from "./Pdf.types";

export type HeaderPageProps = {
  header: PdfHeader;
};
export default function HeaderPage({ ...props }: HeaderPageProps) {
  const text: string = `${props.header.garage.name} ${props.header.garage.address} ${props.header.garage.phone} `;
  return (
    <>
      <View style={[styles.headerPage, styles.fdr, styles.jcb]} fixed>
        <Text render={({ pageNumber }) => (pageNumber > 1 ? `${text}` : null)} />
      </View>
    </>
  );
}
