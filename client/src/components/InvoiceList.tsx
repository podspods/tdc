import React, { useState, useEffect } from "react";
import { invoiceService } from "../services/invoice.service";
import type { Invoice, InvoiceStatus } from "../types/invoice.types";
import { formatCurrency, formatDateFR } from "../common/tools";

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [stats, setStats] = useState<any>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | "">("");
  const [showOverdue, setShowOverdue] = useState<boolean>(false);

  useEffect(() => {
    loadInvoices();
    loadStats();
  }, [page, selectedStatus, showOverdue]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const response = await invoiceService.getAll({
        page,
        limit: 10,
        status: selectedStatus || undefined,
        overdue: showOverdue || undefined,
        search: searchTerm || undefined,
      });
      setInvoices(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load invoices");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await invoiceService.getStats();
      setStats(response.data);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadInvoices();
  };

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return "#10b981";
      case "partially_paid":
        return "#f59e0b";
      case "pending":
        return "#3b82f6";
      case "overdue":
        return "#ef4444";
      case "cancelled":
        return "#6b7280";
      case "draft":
        return "#9ca3af";
      default:
        return "#6b7280";
    }
  };

  const getStatusLabel = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "partially_paid":
        return "Partially Paid";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      case "cancelled":
        return "Cancelled";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      color: "#2563eb",
      margin: 0,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    filters: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap" as const,
    },
    input: {
      flex: 1,
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      minWidth: "200px",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      minWidth: "150px",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      textAlign: "left" as const,
      borderBottom: "2px solid #e5e7eb",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e5e7eb",
    },
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: "white",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Invoices</h1>
        <button style={styles.button} onClick={() => (window.location.href = "/admin/invoices")}>
          Admin Panel
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Invoices</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
              {stats.totalInvoices}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Amount</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
              {formatCurrency(stats.totalAmount)}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Paid</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}>
              {formatCurrency(stats.totalPaid)}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Due</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ef4444" }}>
              {stats.totalDue}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Overdue</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ef4444" }}>
              {stats.overdueCount} ({formatCurrency(stats.overdueAmount)})
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search by invoice #, plate, owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <select
          style={styles.select}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as InvoiceStatus | "")}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
          <option value="draft">Draft</option>
        </select>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={showOverdue}
            onChange={(e) => setShowOverdue(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Show only overdue
        </label>
        <button style={styles.button} onClick={handleSearch}>
          Apply Filters
        </button>
      </div>

      {error && <div style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Invoice #</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Motorcycle</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Paid</th>
                <th style={styles.th}>Due</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td style={styles.td}>
                    <strong>{invoice.invoiceNumber}</strong>
                  </td>
                  <td style={styles.td}>{formatDateFR(invoice.issueDate)}</td>
                  <td style={styles.td}>
                    {formatDateFR(invoice.dueDate)}
                    {invoice.status === "overdue" && " ⚠️"}
                  </td>
                  <td style={styles.td}>
                    {invoice.owner?.fullName}
                    <br />
                    <small>{invoice.owner?.phoneNumber}</small>
                  </td>
                  <td style={styles.td}>
                    {invoice.registration?.plateNumber}
                    <br />
                    <small>{invoice.registration?.brandName}</small>
                  </td>
                  <td style={styles.td}>{formatCurrency(invoice.totalAmount)}</td>
                  <td style={styles.td}>{formatCurrency(invoice.amountPaid)}</td>
                  <td style={styles.td}>{formatCurrency(invoice.amountDue)}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: getStatusColor(invoice.status),
                      }}
                    >
                      {getStatusLabel(invoice.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                style={styles.button}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                style={styles.button}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InvoiceList;
