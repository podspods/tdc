import type { Invoice, LaborItem, PartItem, ConsumableItem } from "./Invoice.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  Th,
  Td,
  SummaryGrid,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  TotalRow,
  TotalLabel,
  TotalValue,
  StatusBadge,
} from "./Invoice.styled";

type InvoicePreviewProps = {
  invoice: Invoice;
};

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("fr-FR");
  };

  return (
    <div>
      {/* Header */}
      <Card>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <CardTitle>INVOICE</CardTitle>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                {invoice.garageInfo.name}
              </div>
            </div>
            <StatusBadge status={invoice.status}>{invoice.status.toUpperCase()}</StatusBadge>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Invoice Number</div>
              <div style={{ fontWeight: "600" }}>{invoice.number}</div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>Issue Date</div>
              <div>{formatDate(invoice.issueDate)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Due Date</div>
              <div>{formatDate(invoice.dueDate)}</div>
            </div>
          </div>

          {/* Client & Vehicle Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Client</div>
              <div style={{ fontWeight: "500" }}>{invoice.owner.name}</div>
              <div style={{ fontSize: "14px" }}>{invoice.owner.phone}</div>
              <div style={{ fontSize: "14px" }}>{invoice.owner.email}</div>
              <div style={{ fontSize: "14px" }}>{invoice.owner.address}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Vehicle</div>
              <div style={{ fontWeight: "500" }}>{invoice.vehicle.plateNumber}</div>
              <div>
                {invoice.vehicle.brand} {invoice.vehicle.model}
              </div>
              <div>Year: {invoice.vehicle.year}</div>
              <div>Color: {invoice.vehicle.color}</div>
              <div>Mileage: {invoice.vehicle.mileage.toLocaleString()} km</div>
            </div>
          </div>

          {/* Labor Items */}
          {invoice.laborItems.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Labor</h3>
              <Table>
                <thead>
                  <tr>
                    <Th>Description</Th>
                    <Th style={{ textAlign: "center" }}>Hours</Th>
                    <Th style={{ textAlign: "right" }}>Rate</Th>
                    <Th style={{ textAlign: "right" }}>Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.laborItems.map((item: LaborItem) => (
                    <tr key={item.id}>
                      <Td>{item.description}</Td>
                      <Td style={{ textAlign: "center" }}>{item.hours}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.ratePerHour)}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.amount)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Parts Items */}
          {invoice.partItems.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Parts</h3>
              <Table>
                <thead>
                  <tr>
                    <Th>Part Name</Th>
                    <Th>Reference</Th>
                    <Th style={{ textAlign: "center" }}>Qty</Th>
                    <Th style={{ textAlign: "right" }}>Unit Price</Th>
                    <Th style={{ textAlign: "right" }}>Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.partItems.map((item: PartItem) => (
                    <tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.reference}</Td>
                      <Td style={{ textAlign: "center" }}>{item.quantity}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.unitPrice)}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.amount)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Consumable Items */}
          {invoice.consumableItems.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                Consumables
              </h3>
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th style={{ textAlign: "center" }}>Qty</Th>
                    <Th>Unit</Th>
                    <Th style={{ textAlign: "right" }}>Unit Price</Th>
                    <Th style={{ textAlign: "right" }}>Amount</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.consumableItems.map((item: ConsumableItem) => (
                    <tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td style={{ textAlign: "center" }}>{item.quantity}</Td>
                      <Td>{item.unit}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.unitPrice)}</Td>
                      <Td style={{ textAlign: "right" }}>{formatCurrency(item.amount)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Summary */}
          <SummaryGrid>
            <SummaryItem>
              <SummaryLabel>Subtotal Labor:</SummaryLabel>
              <SummaryValue>{formatCurrency(invoice.subtotalLabor)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Subtotal Parts:</SummaryLabel>
              <SummaryValue>{formatCurrency(invoice.subtotalParts)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Subtotal Consumables:</SummaryLabel>
              <SummaryValue>{formatCurrency(invoice.subtotalConsumables)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Subtotal HT:</SummaryLabel>
              <SummaryValue>{formatCurrency(invoice.subtotal)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Tax ({invoice.taxRate}%):</SummaryLabel>
              <SummaryValue>{formatCurrency(invoice.taxAmount)}</SummaryValue>
            </SummaryItem>
          </SummaryGrid>

          <TotalRow>
            <TotalLabel>TOTAL TTC:</TotalLabel>
            <TotalValue>{formatCurrency(invoice.totalAmount)}</TotalValue>
          </TotalRow>

          {/* Payment Info */}
          {invoice.paidAmount > 0 && (
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <div style={{ fontSize: "14px" }}>Paid: {formatCurrency(invoice.paidAmount)}</div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                Due: {formatCurrency(invoice.dueAmount)}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "32px",
              paddingTop: "16px",
              borderTop: "1px solid #e5e7eb",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            <div>{invoice.garageInfo.address}</div>
            <div>
              Tel: {invoice.garageInfo.phone} | Email: {invoice.garageInfo.email}
            </div>
            <div>Tax Code: {invoice.garageInfo.taxCode}</div>
            <div style={{ marginTop: "8px" }}>{invoice.terms}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
