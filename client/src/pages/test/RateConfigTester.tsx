import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../services/api-client";

// Types
interface RateType {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  priority: number;
}

interface RateTypesResponse {
  success: boolean;
  data: Record<string, RateType>;
  error?: string;
}

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;

const Title = styled.h1`
  color: #2563eb;
  margin-bottom: 8px;
  font-size: 28px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 24px;
  font-size: 14px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 24px;
`;

const CardHeader = styled.div`
  background-color: #f9fafb;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span<{ $type?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.$type) {
      case "success":
        return "#dcfce7";
      case "error":
        return "#fee2e2";
      case "warning":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$type) {
      case "success":
        return "#166534";
      case "error":
        return "#991b1b";
      case "warning":
        return "#92400e";
      default:
        return "#374151";
    }
  }};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: #f9fafb;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1f2937;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: #991b1b;
`;

const RefreshButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

const MultiplierBadge = styled.span<{ $value: number }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$value > 1 ? "#dcfce7" : props.$value < 1 ? "#fee2e2" : "#f3f4f6"};
  color: ${(props) => (props.$value > 1 ? "#166534" : props.$value < 1 ? "#991b1b" : "#374151")};
`;

const PriorityBadge = styled.span<{ $priority: number }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (props.$priority >= 50 ? "#fef3c7" : "#f3f4f6")};
  color: ${(props) => (props.$priority >= 50 ? "#92400e" : "#374151")};
`;

const RateConfigTester: React.FC = () => {
  const { t } = useTranslation();
  const [rateTypes, setRateTypes] = useState<Record<string, RateType>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchRateTypes();
  }, []);

  const fetchRateTypes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/rate-config/rate-types");
      const data = response.data as RateTypesResponse;

      if (data.success) {
        setRateTypes(data.data);
        setLastUpdated(new Date());
      } else {
        setError(data.error || "Failed to fetch rate types");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching rate types:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalCount = (): number => {
    return Object.keys(rateTypes).length;
  };

  const getAverageMultiplier = (): number => {
    const values = Object.values(rateTypes);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val.multiplier, 0);
    return sum / values.length;
  };

  const getHighestPriority = (): RateType | null => {
    const values = Object.values(rateTypes);
    if (values.length === 0) return null;
    return values.reduce((max, val) => (val.priority > max.priority ? val : max), values[0]);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div style={{ textAlign: "center" }}>
            <div
              className="spinner"
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #e5e7eb",
                borderTopColor: "#2563eb",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p>Loading rate types...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Rate Types Configuration</Title>
      <Subtitle>Manage and view rate type multipliers for labor cost calculation</Subtitle>

      {error && (
        <ErrorContainer>
          <strong>❌ Error:</strong> {error}
          <button
            onClick={fetchRateTypes}
            style={{
              marginLeft: "16px",
              background: "none",
              border: "none",
              color: "#991b1b",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </ErrorContainer>
      )}

      {/* Statistics Cards */}
      <StatsGrid>
        <StatCard>
          <StatValue>{getTotalCount()}</StatValue>
          <StatLabel>Total Rate Types</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{getAverageMultiplier().toFixed(2)}x</StatValue>
          <StatLabel>Average Multiplier</StatLabel>
        </StatCard>
        {getHighestPriority() && (
          <StatCard>
            <StatValue>{getHighestPriority()?.name}</StatValue>
            <StatLabel>Highest Priority</StatLabel>
          </StatCard>
        )}
      </StatsGrid>

      {/* Rate Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            📊 Rate Types List
            <Badge $type="success">{getTotalCount()} items</Badge>
          </CardTitle>
          <RefreshButton onClick={fetchRateTypes} disabled={loading}>
            🔄 Refresh
          </RefreshButton>
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Multiplier</Th>
              <Th>Priority</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rateTypes).map(([key, rateType]) => (
              <Tr key={key}>
                <Td>
                  <code
                    style={{
                      backgroundColor: "#f3f4f6",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {rateType.code}
                  </code>
                </Td>
                <Td>
                  <strong>{rateType.name}</strong>
                </Td>
                <Td>
                  <MultiplierBadge $value={rateType.multiplier}>
                    ×{rateType.multiplier}
                  </MultiplierBadge>
                </Td>
                <Td>
                  <PriorityBadge $priority={rateType.priority}>{rateType.priority}</PriorityBadge>
                </Td>
                <Td style={{ color: "#6b7280" }}>{rateType.description}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>

        {Object.keys(rateTypes).length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
            No rate types found. Please check your configuration.
          </div>
        )}
      </Card>

      {/* Last Updated Info */}
      {lastUpdated && (
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "16px",
          }}
        >
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}
    </Container>
  );
};

export default RateConfigTester;
