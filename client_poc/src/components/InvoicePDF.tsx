import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Register font (optional, for Vietnamese support)
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
    borderBottomColor: "#2563eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 9,
    color: "#666",
  },
  value: {
    fontSize: 10,
  },
  table: {
    marginTop: 15,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  colDescription: { flex: 3 },
  colHours: { flex: 1, textAlign: "center" },
  colRate: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  totalSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 5,
    width: "40%",
  },
  totalLabel: {
    flex: 1,
    fontWeight: "bold",
  },
  totalValue: {
    flex: 1,
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
});

interface InvoiceItem {
  description: string;
  hours?: number;
  rate?: number;
  quantity?: number;
  unitPrice?: number;
  amount: number;
  type: "labor" | "part" | "consumable";
}

interface InvoicePDFProps {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  owner: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  vehicle: {
    plateNumber: string;
    brand: string;
    model: string;
    year?: number;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  totalAmount: number;
  amountPaid: number;
  garageInfo: {
    name: string;
    phone: string;
    address: string;
  };
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  owner,
  vehicle,
  items,
  subtotal,
  taxRate,
  totalAmount,
  amountPaid,
  garageInfo,
}) => {
  const taxAmount = subtotal * (taxRate / 100);
  const amountDue = totalAmount - amountPaid;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}>{garageInfo.name}</Text>
          <Text style={styles.subtitle}>{garageInfo.address}</Text>
          <Text style={styles.subtitle}>Tel: {garageInfo.phone}</Text>
        </View>

        {/* Invoice Info */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Invoice Number</Text>
            <Text style={styles.value}>{invoiceNumber}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Issue Date</Text>
            <Text style={styles.value}>{issueDate}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{dueDate}</Text>
          </View>
        </View>

        {/* Client & Vehicle Info */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.value}>{owner.name}</Text>
            <Text style={styles.value}>{owner.phone}</Text>
            {owner.email && <Text style={styles.value}>{owner.email}</Text>}
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Vehicle</Text>
            <Text style={styles.value}>Plate: {vehicle.plateNumber}</Text>
            <Text style={styles.value}>
              {vehicle.brand} {vehicle.model}
            </Text>
            {vehicle.year && <Text style={styles.value}>Year: {vehicle.year}</Text>}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>Description</Text>
            <Text style={styles.colHours}>Qty/Hrs</Text>
            <Text style={styles.colRate}>Rate</Text>
            <Text style={styles.colAmount}>Amount</Text>
          </View>

          {/* Items */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colHours}>
                {item.hours ? `${item.hours}h` : item.quantity || 1}
              </Text>
              <Text style={styles.colRate}>
                {item.rate
                  ? formatCurrency(item.rate)
                  : item.unitPrice
                    ? formatCurrency(item.unitPrice)
                    : "-"}
              </Text>
              <Text style={styles.colAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({taxRate}%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(taxAmount)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Paid:</Text>
            <Text style={styles.totalValue}>{formatCurrency(amountPaid)}</Text>
          </View>
          <View
            style={[
              styles.totalRow,
              { marginTop: 5, paddingTop: 5, borderTopWidth: 1, borderTopColor: "#000" },
            ]}
          >
            <Text style={[styles.totalLabel, { fontSize: 12 }]}>Amount Due:</Text>
            <Text
              style={[styles.totalValue, { fontSize: 12, fontWeight: "bold", color: "#2563eb" }]}
            >
              {formatCurrency(amountDue)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Payment due by {dueDate}. Late payments may incur additional fees.</Text>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};
