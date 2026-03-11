import React, { useState, useEffect } from "react";
import { motorcycleModelService } from "../services/motorcycleModel.service";
import { formatDateFR } from "../commun/tools";
import type { MotorcycleModel } from "../types/motorcycleModel.types";

const MotorcycleModelList: React.FC = () => {
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    loadModels();
  }, [page, selectedBrand]);

  const loadModels = async () => {
    setLoading(true);
    try {
      const response = await motorcycleModelService.getAll({
        page,
        limit: 20,
        brandId: selectedBrand,
        search: searchTerm || undefined,
      });
      setModels(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (err) {
      setError("Failed to load models");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadModels();
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
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      minWidth: "200px",
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
      backgroundColor: "#e5e7eb",
    },
    badgeCurrent: {
      backgroundColor: "#10b981",
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
        <h1 style={styles.title}>Motorcycle Models</h1>
        <button style={styles.button} onClick={() => (window.location.href = "/admin/models")}>
          + Admin Panel
        </button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          style={{ ...styles.input, flex: 1 }}
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <select
          style={styles.select}
          value={selectedBrand || ""}
          onChange={(e) => setSelectedBrand(e.target.value ? parseInt(e.target.value) : undefined)}
        >
          <option value="">All Brands</option>
          {/* Will be populated from API */}
        </select>
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Model</th>
                <th style={styles.th}>Years</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Engine</th>
                <th style={styles.th}>Power</th>
                <th style={styles.th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.modelId}>
                  <td style={styles.td}>
                    <strong>{model.brandName}</strong>
                  </td>
                  <td style={styles.td}>{model.modelName}</td>
                  <td style={styles.td}>
                    {model.yearStart} - {model.yearEnd || "Present"}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...(model.isCurrent ? styles.badgeCurrent : {}),
                      }}
                    >
                      {model.isCurrent ? "Current" : "Discontinued"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {model.engineDisplacement ? `${model.engineDisplacement}cc` : "-"}
                  </td>
                  <td style={styles.td}>{model.powerHp ? `${model.powerHp} hp` : "-"}</td>
                  <td style={styles.td}>{formatDateFR(model.createdAt)}</td>
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

export default MotorcycleModelList;
