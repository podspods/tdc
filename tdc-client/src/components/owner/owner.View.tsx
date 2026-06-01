import { useTranslation } from "react-i18next";
import { formatCurrency, formatDateToYYYYMMDD } from "../../common/common";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  StatLabel,
  StatsGrid,
  StatValue,
} from "../../common/common.styled";
import Label from "../UI/Label";

import type { Owner } from "./owner.types";

type OwnersViewProps = {
  owner: Owner;
  onClose: () => void;
  onEdit: () => void;
};

export function OwnersView({ owner, onClose, onEdit }: OwnersViewProps) {
  const { t } = useTranslation(["invoice"]);

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
          <StatValue>
            {owner.lastVisitDate ? formatDateToYYYYMMDD(owner.lastVisitDate) : "-"}
          </StatValue>
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
              <Label label={t("fullName")} value={`${owner.firstName} ${owner.lastName}`} />
            </div>
            <div>
              <Label label={t("phone")} value={owner.phoneNumber} />
            </div>
            <div>
              <Label label={t("email")} value={owner.email || "-"} />
            </div>
            <div>
              <Label label={t("city")} value={owner.city || "-"} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label label={t("address")} value={owner.address || "-"} />
            </div>
            <div>
              <Label label={t("category")} value={owner.category?.toString() || ""} />
            </div>
            <div>
              <Label label={t("status")} value={owner.status?.toString() || ""} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label label={t("notes")} value={owner.notes || ""} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button variant="secondary" onClick={onClose}>
          {t("close")}
        </Button>
        <Button variant="primary" onClick={onEdit}>
          {t("editOwner")}
        </Button>
      </div>
    </div>
  );
}
