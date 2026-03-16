import React, { useState, useEffect } from "react";
import { laborService } from "../services/labor.service";
import type { Labor, LaborCategory } from "../types/labor.types";
import { formatCurrency } from "../common/tools";

const LaborList: React.FC = () => {
  const [laborItems, setLaborItems] = useState<Labor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<LaborCategory | "">("");

  useEffect(() => {
    loadLabor();
  }, [selectedCategory]);

  const loadLabor = async () => {
    setLoading(true);
    try {
      const response = await laborService.getAll({
        category: selectedCategory || undefined,
        search: searchTerm || undefined,
      });
      setLaborItems(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load labor items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadLabor();
  };

  const getCategoryLabel = (category?: LaborCategory) => {
    switch (category) {
      case "maintenance":
        return "🔧 Maintenance";
      case "repair":
        return "⚙️ Repair";
      case "diagnostic":
        return "🔍 Diagnostic";
      case "customization":
        return "🎨 Customization";
      default:
        return "Other";
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
    filters: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      flex: 1,
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
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
      backgroundColor: "#e5e7eb",
    },
    activeBadge: {
      backgroundColor: "#10b981",
      color: "white",
    },
    inactiveBadge: {
      backgroundColor: "#ef4444",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Labor Catalog</h1>
        <button style={styles.button} onClick={() => (window.location.href = "/admin/labor")}>
          Admin Panel
        </button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <select
          style={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as LaborCategory | "")}
        >
          <option value="">All Categories</option>
          <option value="maintenance">Maintenance</option>
          <option value="repair">Repair</option>
          <option value="diagnostic">Diagnostic</option>
          <option value="customization">Customization</option>
        </select>
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <div style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Rate/Hour</th>
              <th style={styles.th}>Est. Hours</th>
              <th style={styles.th}>Min Charge</th>
              <th style={styles.th}>Skill Level</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {laborItems.map((item) => (
              <tr key={item.laborId}>
                <td style={styles.td}>
                  <strong>{item.laborCode}</strong>
                </td>
                <td style={styles.td}>{item.laborName}</td>
                <td style={styles.td}>{getCategoryLabel(item.category)}</td>
                <td style={styles.td}>{formatCurrency(item.defaultRatePerHour)}</td>
                <td style={styles.td}>{item.estimatedHours ? `${item.estimatedHours}h` : "-"}</td>
                <td style={styles.td}>{item.minCharge ? formatCurrency(item.minCharge) : "-"}</td>
                <td style={styles.td}>{item.requiredSkillLevel || "-"}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...(item.isActive ? styles.activeBadge : styles.inactiveBadge),
                    }}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LaborList;
