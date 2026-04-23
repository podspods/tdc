import type { Vehicle } from "./vehicle.types";
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
import { useTranslation } from "react-i18next";
import CardField from "../UI/CardField";

export type ViewProps = {
  vehicle: Vehicle;
  onClose: () => void;
  onEdit: () => void;
};
export default function View({ ...props }: ViewProps) {
  const { t } = useTranslation(["vehicle"]);

  function formatOdometer(km: number): string {
    return new Intl.NumberFormat("vi-VN").format(km) + " km";
  }

  return (
    <div>
      <StatsGrid>
        <StatCard>
          <StatValue>{props.vehicle.year}</StatValue>
          <StatLabel>Year</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>
            {props.vehicle.mileage ? formatOdometer(props.vehicle.mileage) : "-"}
          </StatValue>
          <StatLabel>Mileage</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{props.vehicle.color || "-"}</StatValue>
          <StatLabel>Color</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{props.vehicle.ownerId || "-"}</StatValue>
          <StatLabel>Owner ID</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CardField label={t("plateNumber")} value={props.vehicle.plateNumber} />
          <CardField label={t("brand")} value={props.vehicle.brand} />
          <CardField label={t("model")} value={props.vehicle.model} />
          <CardField label={t("year")} value={props.vehicle.year} />
          <CardField label={t("color")} value={props.vehicle.color} />
          <CardField label={t("mileage")} value={props.vehicle.mileage} />
          <CardField label={t("ownerId")} value={props.vehicle.ownerId} />
          <CardField label={t("registrationId")} value={props.vehicle.registrationId} />
        </CardContent>
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onEdit}>
          Edit Vehicle
        </Button>
      </div>
    </div>
  );
}
