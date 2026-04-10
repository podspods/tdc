import { type Owner } from "./Owners.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Button,
} from "./Owners.styled";

type OwnersViewProps = {
  owner: Owner;
  onClose: () => void;
  onEdit: () => void;
};

export function OwnersView({ owner, onClose, onEdit }: OwnersViewProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("fr-FR");
  };

  return (
    <div>
      <StatsGrid>
        <StatCard>
          <StatValue>{owner.totalMotorcycles}</StatValue>
          <StatLabel>Motorcycles</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{owner.totalInvoices}</StatValue>
          <StatLabel>Invoices</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(owner.totalSpent)}</StatValue>
          <StatLabel>Total Spent</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{owner.lastVisitDate ? formatDate(owner.lastVisitDate) : "-"}</StatValue>
          <StatLabel>Last Visit</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Full Name</div>
              <div style={{ fontWeight: "500" }}>{owner.fullName}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Phone</div>
              <div>{owner.phoneNumber}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Email</div>
              <div>{owner.email || "-"}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>City</div>
              <div>{owner.city || "-"}</div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Address</div>
              <div>{owner.address || "-"}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Category</div>
              <div>{owner.category}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Status</div>
              <div>{owner.status}</div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Notes</div>
              <div>{owner.notes || "-"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onEdit}>
          Edit Owner
        </Button>
      </div>
    </div>
  );
}
