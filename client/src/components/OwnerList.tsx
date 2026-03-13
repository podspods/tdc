import React, { useState, useEffect } from "react";
import { formatDateFR } from "../commun/tools";
import type { Owner, OwnerCategory } from "../types/owner.types";

const OwnerList: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [stats, setStats] = useState<any>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<OwnerCategory | "">("");

  useEffect(() => {
    loadOwners();
    loadStats();
  }, [page, selectedCategory]);

  const loadOwners = async () => {
    setLoading(true);
    try {
      const response = await ownerService.getAll({
        page,
        limit: 10,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
      });
      setOwners(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load owners");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await ownerService.getStats();
      setStats(response.data);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadOwners();
  };

  const getCategoryColor = (category: OwnerCategory) => {
    switch (category) {
      case "vip":
        return "#fbbf24"; // Gold
      case "important":
        return "#10b981"; // Green
      case "basic":
        return "#6b7280"; // Gray
      default:
        return "#6b7280";
    }
  };

  const getCategoryLabel = (category: OwnerCategory) => {
    switch (category) {
      case "vip":
        return "VIP ⭐";
      case "important":
        return "Important ⚡";
      case "basic":
        return "Basic";
      default:
        return category;
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
        <h1 style={styles.title}>Owners / Clients</h1>
        <button style={styles.button} onClick={() => (window.location.href = "/admin/owners")}>
          Admin Panel
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Owners</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
              {stats.totalOwners}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Basic</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6b7280" }}>
              {stats.byCategory.basic}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Important</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}>
              {stats.byCategory.important}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>VIP</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fbbf24" }}>
              {stats.byCategory.vip}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Spent</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                stats.totalSpentAll,
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search by name, phone, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <select
          style={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as OwnerCategory | "")}
        >
          <option value="">All Categories</option>
          <option value="basic">Basic</option>
          <option value="important">Important</option>
          <option value="vip">VIP</option>
        </select>
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
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>City</th>
                <th style={styles.th}>Motorcycles</th>
                <th style={styles.th}>Invoices</th>
                <th style={styles.th}>Total Spent</th>
                <th style={styles.th}>Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.ownerId}>
                  <td style={styles.td}>
                    <strong>{owner.fullName}</strong>
                  </td>
                  <td style={styles.td}>{owner.phoneNumber}</td>
                  <td style={styles.td}>{owner.email || "-"}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: getCategoryColor(owner.category),
                      }}
                    >
                      {getCategoryLabel(owner.category)}
                    </span>
                  </td>
                  <td style={styles.td}>{owner.city || "-"}</td>
                  <td style={styles.td}>{owner.totalMotorcycles}</td>
                  <td style={styles.td}>{owner.totalInvoices}</td>
                  <td style={styles.td}>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      owner.totalSpent,
                    )}
                  </td>
                  <td style={styles.td}>
                    {owner.lastVisitDate ? formatDateFR(owner.lastVisitDate) : "-"}
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

export default OwnerList;
