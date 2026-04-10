import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiClient } from "../../services/api-client";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Types
interface RateType {
  code: string;
  name: string;
  multiplier: number;
  description: string;
  priority: number;
}

interface BaseRate {
  value: number;
  currency: string;
  description: string;
}

interface RateTypesResponse {
  success: boolean;
  data: Record<string, RateType>;
  error?: string;
}

interface BaseRateResponse {
  success: boolean;
  data: BaseRate;
  error?: string;
}

// Mobile-first responsive styled components
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 24px;
  }
`;

const Title = styled.h1`
  color: #2563eb;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 20px;
  font-size: 13px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const EditCard = styled(Card)`
  border: 2px solid #2563eb;
`;

const CardHeader = styled.div`
  background-color: #f9fafb;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media (min-width: 768px) {
    padding: 16px 20px;
  }
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Badge = styled.span<{ $type?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;

  @media (min-width: 768px) {
    padding: 4px 10px;
    font-size: 12px;
  }

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

const TableContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 640px) {
    margin: 0 -16px;
    padding: 0 16px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;

  @media (max-width: 480px) {
    min-width: 400px;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  background-color: #f9fafb;
  font-weight: 600;
  font-size: 12px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;

  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 12px;
  color: #1f2937;

  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 640px) {
    &:active {
      background-color: #f3f4f6;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #6b7280;

  @media (min-width: 768px) {
    padding: 60px;
  }
`;

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  color: #991b1b;
  font-size: 13px;

  @media (min-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
    font-size: 14px;
  }
`;

const RefreshButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
    gap: 8px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    gap: 16px;
    margin-bottom: 24px;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (min-width: 768px) {
    padding: 16px;
  }
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #6b7280;
  margin-top: 4px;

  @media (min-width: 768px) {
    font-size: 12px;
    margin-top: 6px;
  }
`;

const MultiplierBadge = styled.span<{ $value: number }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 500;

  @media (min-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }

  background-color: ${(props) =>
    props.$value > 1 ? "#dcfce7" : props.$value < 1 ? "#fee2e2" : "#f3f4f6"};
  color: ${(props) => (props.$value > 1 ? "#166534" : props.$value < 1 ? "#991b1b" : "#374151")};
`;

const PriorityBadge = styled.span<{ $priority: number }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 500;

  @media (min-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }

  background-color: ${(props) => (props.$priority >= 50 ? "#fef3c7" : "#f3f4f6")};
  color: ${(props) => (props.$priority >= 50 ? "#92400e" : "#374151")};
`;

const FormGroup = styled.div`
  margin-bottom: 14px;

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 480px) {
    flex-direction: row;
  }

  & > div:first-child {
    flex: 2;
  }

  & > div:last-child {
    flex: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  min-height: 60px;
  resize: vertical;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  @media (min-width: 768px) {
    min-height: 80px;
  }
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" | "success" }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
  flex: 1;

  @media (min-width: 480px) {
    flex: none;
    padding: 10px 20px;
  }

  background-color: ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "#6b7280";
      case "success":
        return "#10b981";
      default:
        return "#2563eb";
    }
  }};
  color: white;

  &:hover {
    background-color: ${(props) => {
      switch (props.$variant) {
        case "secondary":
          return "#4b5563";
        case "success":
          return "#059669";
        default:
          return "#1d4ed8";
      }
    }};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 12px;
  }
`;

const CurrentValueDisplay = styled.div`
  background-color: #f0f9ff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
`;

const CurrentValueText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0c4a6e;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const CurrentValueLabel = styled.span`
  font-size: 11px;
  color: #0369a1;
  margin-right: 8px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const Message = styled.div<{ $type?: "success" | "error" }>`
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;

  @media (min-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }

  background-color: ${(props) => (props.$type === "success" ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$type === "success" ? "#166534" : "#991b1b")};
`;

const LastUpdated = styled.div`
  text-align: center;
  font-size: 10px;
  color: #9ca3af;
  margin-top: 16px;

  @media (min-width: 768px) {
    font-size: 12px;
    margin-top: 20px;
  }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 12px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RateConfigTester: React.FC = () => {
  const { t } = useTranslation();
  const [rateTypes, setRateTypes] = useState<Record<string, RateType>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // State for base rate
  const [baseRate, setBaseRate] = useState<BaseRate>({
    value: 500000,
    currency: "VND",
    description: "Base hourly rate in Vietnamese Dong",
  });
  const [editFormData, setEditFormData] = useState({
    value: "",
    currency: "VND",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchRateTypes();
    fetchBaseRate();
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

  const fetchBaseRate = async () => {
    try {
      const response = await apiClient.get("/rate-config/base-rate");
      const data = response.data as BaseRateResponse;

      if (data.success) {
        setBaseRate(data.data);
        setEditFormData({
          value: data.data.value.toString(),
          currency: data.data.currency,
          description: data.data.description,
        });
      }
    } catch (err) {
      console.error("Error fetching base rate:", err);
    }
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    setSaveMessage(null);
  };

  const handleSaveBaseRate = async () => {
    const newValue = parseInt(editFormData.value, 10);
    if (isNaN(newValue) || newValue <= 0) {
      setSaveMessage({ type: "error", text: "Please enter a valid positive number" });
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    try {
      const response = await apiClient.put("/rate-config/base-rate", {
        value: newValue,
        currency: editFormData.currency,
        description: editFormData.description,
      });

      const data = response.data as BaseRateResponse;

      if (data.success) {
        setBaseRate({
          value: newValue,
          currency: editFormData.currency,
          description: editFormData.description,
        });
        setSaveMessage({ type: "success", text: "Base rate updated successfully!" });
        toast.success("Base rate updated successfully");
        setShowEdit(false);
      } else {
        setSaveMessage({ type: "error", text: data.error || "Failed to update base rate" });
        toast.error(data.error || "Failed to update base rate");
      }
    } catch (err) {
      console.error("Error updating base rate:", err);
      setSaveMessage({ type: "error", text: "Failed to update base rate" });
      toast.error("Failed to update base rate");
    } finally {
      setSaving(false);
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

  const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div style={{ textAlign: "center" }}>
            <Spinner />
            <p>{t("Loading rate types...")}</p>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Rate Types Configuration</Title>
      <Subtitle>Manage rate type multipliers for labor cost calculation</Subtitle>

      {/* Base Rate Edit Card */}
      <EditCard>
        <CardHeader>
          <CardTitle>
            💰 Base Rate
            <Badge $type="warning">Edit</Badge>
          </CardTitle>
          {!showEdit ? (
            <RefreshButton onClick={() => setShowEdit(true)}>✏️ Edit</RefreshButton>
          ) : (
            <RefreshButton onClick={() => setShowEdit(false)}>Cancel</RefreshButton>
          )}
        </CardHeader>

        {!showEdit ? (
          <div style={{ padding: "16px" }}>
            <CurrentValueDisplay>
              <div>
                <CurrentValueLabel>Hourly Rate</CurrentValueLabel>
                <CurrentValueText>
                  {formatCurrency(baseRate.value, baseRate.currency)}
                </CurrentValueText>
              </div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>{baseRate.description}</div>
            </CurrentValueDisplay>
          </div>
        ) : (
          <div style={{ padding: "16px" }}>
            {saveMessage && (
              <Message $type={saveMessage.type}>
                {saveMessage.type === "success" ? "✓" : "✗"} {saveMessage.text}
              </Message>
            )}

            <FormGroup>
              <Label>Rate Value *</Label>
              <InputGroup>
                <div>
                  <Input
                    type="number"
                    name="value"
                    value={editFormData.value}
                    onChange={handleEditInputChange}
                    placeholder="Enter amount"
                    min="0"
                    step="1000"
                    required
                  />
                </div>
                <div>
                  <Select
                    name="currency"
                    value={editFormData.currency}
                    onChange={handleEditInputChange}
                  >
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </div>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>{t("Description")}</Label>
              <Textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditInputChange}
                placeholder="Describe the base rate"
                rows={2}
              />
            </FormGroup>

            <ButtonGroup>
              <Button $variant="success" onClick={handleSaveBaseRate} disabled={saving}>
                {saving ? t("Saving...") : t("Save")}
              </Button>
              <Button
                $variant="secondary"
                onClick={() => {
                  setEditFormData({
                    value: baseRate.value.toString(),
                    currency: baseRate.currency,
                    description: baseRate.description,
                  });
                  setShowEdit(false);
                  setSaveMessage(null);
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        )}
      </EditCard>

      {error && (
        <ErrorContainer>
          <strong>❌ Error:</strong> {error}
          <button
            onClick={fetchRateTypes}
            style={{
              marginLeft: "12px",
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
          <StatLabel>Rate Types</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{getAverageMultiplier().toFixed(2)}x</StatValue>
          <StatLabel>Avg Multiplier</StatLabel>
        </StatCard>
        {getHighestPriority() && (
          <StatCard>
            <StatValue style={{ fontSize: "14px" }}>{getHighestPriority()?.name}</StatValue>
            <StatLabel>Highest Priority</StatLabel>
          </StatCard>
        )}
      </StatsGrid>

      {/* Rate Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            📊 Rate Types
            <Badge $type="success">{getTotalCount()}</Badge>
          </CardTitle>
          <RefreshButton onClick={fetchRateTypes} disabled={loading}>
            🔄
          </RefreshButton>
        </CardHeader>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>{t("Code<")}</Th>
                <Th>{t("Name<")}</Th>
                <Th>{t("Mult<")}</Th>
                <Th>{t("Priority")}</Th>
                <Th>{t("Description<")}</Th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rateTypes).map(([key, rateType]) => (
                <Tr key={key}>
                  <Td>
                    <code
                      style={{
                        backgroundColor: "#f3f4f6",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "11px",
                      }}
                    >
                      {rateType.code}
                    </code>
                  </Td>
                  <Td>
                    <strong style={{ fontSize: "12px" }}>{rateType.name}</strong>
                  </Td>
                  <Td>
                    <MultiplierBadge $value={rateType.multiplier}>
                      ×{rateType.multiplier}
                    </MultiplierBadge>
                  </Td>
                  <Td>
                    <PriorityBadge $priority={rateType.priority}>{rateType.priority}</PriorityBadge>
                  </Td>
                  <Td style={{ color: "#6b7280", fontSize: "11px" }}>{rateType.description}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        {Object.keys(rateTypes).length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "32px", color: "#6b7280", fontSize: "14px" }}>
            No rate types found
          </div>
        )}
      </Card>

      {/* Last Updated Info */}
      {lastUpdated && <LastUpdated>Updated: {lastUpdated.toLocaleTimeString()}</LastUpdated>}
    </Container>
  );
};

export default RateConfigTester;
