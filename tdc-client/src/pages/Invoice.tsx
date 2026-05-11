import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { pdf } from "@react-pdf/renderer";
import ToPdf from "../components/Invoice/invoice.ToPdf";

export default function Invoice() {
  const { t } = useTranslation(["invoice"]);
  const invoiceDbId = 42;
  //--------------------------------------------------------------------------------------------------------------------------

  async function handleCreate() {
    // Generate the PDF document
    const blob = await pdf(<ToPdf invoiceDbId={invoiceDbId} />).toBlob();
    const url = URL.createObjectURL(blob);
    // Open in a new tab
    window.open(url, "_blank");
    // Revoke the URL after a delay to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <Header>
        <Title>{t("title")}</Title>

        <Button variant="primary" onClick={handleCreate}>
          {t("toPdf")}
        </Button>
      </Header>
    </MainContainer>
  );
}
