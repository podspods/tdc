import { InvoiceHeaderManager } from "../components/InvoiceHeader/InvoiceHeaderManager";
import { useTranslation } from "react-i18next";
import { PageContainer, PageDescription, PageHeader, PageTitle } from "./InvoiceHeaderPage.styled";

export function InvoiceHeaderPage() {
  const { t } = useTranslation(["invoiceHeaders"]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{t("title")}</PageTitle>
        <PageDescription>{t("description")}</PageDescription>
      </PageHeader>
      <InvoiceHeaderManager />
    </PageContainer>
  );
}
