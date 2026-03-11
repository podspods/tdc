export const URL = "http://localhost:3002/api/motorcycle-brands";
// const URL = "http://localhost:3002/health";
// Styles
export const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
    marginBottom: "10px",
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
  statLabel: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "5px",
    textTransform: "uppercase" as const,
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginRight: "10px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#f3f4f6",
    padding: "12px",
    textAlign: "left" as const,
    fontWeight: "bold",
    borderBottom: "2px solid #e5e7eb",
    fontSize: "0.875rem",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "0.875rem",
  },
  trEven: {
    backgroundColor: "#f9fafb",
  },
  trHover: {
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  loadingBox: {
    textAlign: "center" as const,
    padding: "40px",
    color: "#6b7280",
  },
  expandedRow: {
    backgroundColor: "#f3f4f6",
    padding: "15px",
    borderRadius: "5px",
  },
  badge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    backgroundColor: "#e5e7eb",
    color: "#374151",
  },
  badgeJapan: {
    backgroundColor: "#dc2626",
    color: "white",
  },
  badgeVietnam: {
    backgroundColor: "#fbbf24",
    color: "#1f2937",
  },
  badgeGermany: {
    backgroundColor: "#000000",
    color: "white",
  },
};
