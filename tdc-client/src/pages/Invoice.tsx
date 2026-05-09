import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { pdf } from "@react-pdf/renderer";
import ToPdf from "../components/Invoice/invoice.ToPdf";
import type { GarageInfo, InvoiceData } from "../components/Invoice/invoice.types";
import type { CreateOwnerDto } from "../components/owner/owner.types";
import InvoicePDF from "../components/Invoice/InvoicePDF";

export default function Invoice() {
  const { t } = useTranslation(["invoice"]);

  const invoiceData: InvoiceData = {
    invoiceNumber: "20260509-001",
    date: "titi",
    clientName: "titi",
    total: 42,
  };

  const garage: GarageInfo = {
    name: "TDC Moto Garage",
    logoUrl: "/logo.jpg",
    address: "123 Lê Lợi, Quận 1, TP. Hồ  Chí Minh",
    phone: "028 1234 5678",
    email: "contact@tdcmoto.com",
    taxCode: "1234567890",
    website: "garage-website.com",
    bankName: "garage-bankName",
    bankAccount: "garage-bankAccount",
  };

  const owner: CreateOwnerDto = {
    firstName: "Pierre",
    lastName: "Durand",
    phoneNumber: "+33 1234123412",
    address: "C15/25 đường Phạm Hùng nối dà",
    city: "Thành phố Hồ Chí Minh",
  };
  //--------------------------------------------------------------------------------------------------------------------------

  async function handleCreate() {
    // Generate the PDF document
    const blob = await pdf(<ToPdf garage={garage} data={invoiceData} owner={owner} />).toBlob();
    const url = URL.createObjectURL(blob);
    // Open in a new tab
    window.open(url, "_blank");
    // Revoke the URL after a delay to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  //--------------------------------------------------------------------------------------------------------------------------
  const XhandleCreate = async () => {
    const blob = await pdf(
      <InvoicePDF
        garage={garage}
        owner={owner}
        subtotalLabor={0}
        subtotalParts={0}
        subtotalConsumables={0}
        subtotal={0}
        taxRate={0}
        taxAmount={0}
        totalAmount={0}
        notes={"0"}
        date={"0"}
      />,
    ).toBlob();
    window.open(URL.createObjectURL(blob), "_blank");
  };
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
