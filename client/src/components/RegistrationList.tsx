import React, { useState, useEffect } from "react";
import { registrationService } from "../services/registration.service";
import type { Registration } from "../types/registration.types";
import { formatDateFR } from "../commun/tools";

const RegistrationList: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    loadRegistrations();
  }, [page]);

  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const response = await registrationService.getAll({
        page,
        limit: 10,
        search: searchTerm || undefined,
      });
      setRegistrations(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load registrations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadRegistrations();
  };

  const handleSearchByPlate = async () => {
    if (!searchTerm) {
      loadRegistrations();
      return;
    }

    setLoading(true);
    try {
      const response = await registrationService.getByPlate(searchTerm);
      setRegistrations(response.data ? [response.data] : []);
      setTotalPages(1);
      setError(null);
    } catch (err) {
      setError("Registration not found");
      setRegistrations([]);
    } finally {
      setLoading(false);
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
    searchContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      flex: 1,
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
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
      borderRadius: "4px",
      backgroundColor: "#e5e7eb",
      fontSize: "0.875rem",
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
        <h1 style={styles.title}>Motorcycle Registrations</h1>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/admin/registrations")}
        >
          Admin Panel
        </button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.input}
          placeholder="Search by plate number or owner name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#10b981" }}
          onClick={handleSearchByPlate}
        >
          Search by Plate
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
                <th style={styles.th}>Plate Number</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Model</th>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ ...styles.td, textAlign: "center" }}>
                    No registrations found
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.registrationId}>
                    <td style={styles.td}>
                      <strong>{reg.plateNumber}</strong>
                    </td>
                    <td style={styles.td}>{reg.ownerName}</td>
                    <td style={styles.td}>{reg.brandName}</td>
                    <td style={styles.td}>{reg.modelName || "-"}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: reg.color?.toLowerCase() || "#e5e7eb",
                          color: ["black", "blue", "red", "green"].includes(
                            reg.color?.toLowerCase() || "",
                          )
                            ? "white"
                            : "black",
                        }}
                      >
                        {reg.color || "-"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {reg.ownerPhone && <div>📞 {reg.ownerPhone}</div>}
                      {reg.ownerEmail && <div>✉️ {reg.ownerEmail}</div>}
                    </td>
                    <td style={styles.td}>{formatDateFR(reg.createdAt)}</td>
                  </tr>
                ))
              )}
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

export default RegistrationList;
