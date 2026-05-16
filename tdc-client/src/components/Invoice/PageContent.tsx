import { useTranslation } from "react-i18next";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "../../common/common.styled";
import type { InvoiceInfo } from "./invoice.types";

export type PageContentProps = {
  loading: boolean;
  generatingId: number;
  invoiceInfoList: InvoiceInfo[];
  handleGeneratePdf: (id: number) => void;
};
export default function PageContent({ ...props }: PageContentProps) {
  const { t } = useTranslation(["invoice"]);

  return (
    <>
      {/* List of existing props.invoiceList */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Existing Invoices</h2>
        {props.loading ? (
          <p>Loading invoiceList...</p>
        ) : props.invoiceInfoList.length === 0 ? (
          <p>No props.invoiceList found.</p>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>{t("invoice")}</Th>
                <Th>{t("owner")}</Th>
                <Th>{t("vehicle")}</Th>
                <Th>{t("dueDate")}</Th>
                <Th>{t("issueDate")}</Th>
                <Th>{t("status")}</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.invoiceInfoList.map((invoice) => (
                <Tr key={invoice.invoiceId}>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {invoice.invoiceId}
                  </Td>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {invoice.invoiceNumber}
                  </Td>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {invoice.ownerFirstName} {invoice.ownerLastName}
                  </Td>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {invoice.vehicleBrand} {invoice.vehicleModel} {invoice.vehicleColor}{" "}
                    {invoice.vehicleplateNumber}
                  </Td>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {new Date(invoice.dueDate).toLocaleDateString("vi-VN")}
                  </Td>

                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {new Date(invoice.issueDate).toLocaleDateString("vi-VN")}
                  </Td>
                  <Td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {invoice.statusText}
                  </Td>
                  <Td
                    style={{ padding: "8px", borderBottom: "1px solid #eee", textAlign: "center" }}
                  >
                    <Button
                      variant="secondary"
                      onClick={() => props.handleGeneratePdf(invoice.invoiceId)}
                      disabled={props.generatingId === invoice.invoiceId}
                    >
                      {props.generatingId === invoice.invoiceId ? "Generating..." : "Generate PDF"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </>
  );
}
