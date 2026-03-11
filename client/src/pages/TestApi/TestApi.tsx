import React, { useEffect, useState } from "react";
import type { MotorcycleBrand } from "../../types/motorcycleBrand.types";
import { styles, URL } from "./TestApi.style";

export type TestApiProps = {};
export default function TestApi({ ...props }: TestApiProps) {
  const [count, setCount] = useState<number>(0);
  const [responseData, setResponseData] = useState<MotorcycleBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [expandedBrand, setExpandedBrand] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Appel à l'API health
      const response = await fetch(URL);
      console.log(response);
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response data:", result);

      // Extraire le tableau data de la réponse
      setResponseData(result.data || []);

      // const data: MotorcycleBrand[] = await response.json();
      // setResponseData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch  data");
      console.error("Error fetching DaTa:", err);
    } finally {
      setLoading(false);
    }
  };

  // Formater la date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <h1>TestApi 60000: {count}</h1>
      'responseData.length' :{responseData.length}
      <br />
      <div style={{ overflowX: "auto" }}>
        {responseData.length && <div> {responseData[0].brandName}</div>}
        <table>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Marque</th>
              <th style={styles.th}>Pays d'origine</th>
              <th style={styles.th}>Créé par</th>
              <th style={styles.th}>Date de création</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responseData.length &&
              responseData.map((brand, index) => (
                <React.Fragment key={brand.brandId}>
                  <tr
                    style={{
                      ...(index % 2 === 0 ? styles.trEven : {}),
                      ...styles.trHover,
                    }}
                    // onClick={() => setExpandedBrand(expandedBrand === brand.brandId ? null : brand.brandId)}
                  >
                    <td style={styles.td}>
                      <span style={styles.badge}>#{brand.brandId}</span>
                    </td>
                    <td style={{ ...styles.td, fontWeight: "bold" }}>{brand.brandName}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          ...(brand.countryOfOrigin === "Japan"
                            ? styles.badgeJapan
                            : brand.countryOfOrigin === "Vietnam"
                              ? styles.badgeVietnam
                              : brand.countryOfOrigin === "Germany"
                                ? styles.badgeGermany
                                : {}),
                        }}
                      >
                        {brand.countryOfOrigin}
                      </span>
                    </td>
                    <td style={styles.td}>{brand.createdBy}</td>
                    <td style={styles.td}>{brand.createDate}</td>
                    <td style={styles.td}>
                      <button
                        style={{
                          backgroundColor: "#10b981",
                          color: "white",
                          padding: "4px 8px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                        }}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setExpandedBrand(expandedBrand === brand.brandId ? null : brand.brandId);
                        // }}
                      >
                        {/* {expandedBrand === brand.brandId ? '▼' : '▶'} Détails */}
                      </button>
                    </td>
                  </tr>
                  {expandedBrand === brand.brandId && (
                    <tr>
                      <td colSpan={6} style={{ padding: "0" }}>
                        <div style={styles.expandedRow}>
                          <h4 style={{ margin: "0 0 10px 0", color: "#2563eb" }}>
                            Détails complets - {brand.brandName}
                          </h4>
                          <pre
                            style={{
                              backgroundColor: "#1f2937",
                              color: "#e5e7eb",
                              padding: "10px",
                              borderRadius: "5px",
                              overflow: "auto",
                              fontSize: "0.875rem",
                              margin: 0,
                            }}
                          >
                            {JSON.stringify(brand, null, 2)}
                          </pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      {/* Résumé */}
      <div
        style={{
          ...styles.statCard,
          marginTop: "20px",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>Total des enregistrements:</strong> {responseData.length}
          </div>
        </div>
      </div>
    </>
  );
}
