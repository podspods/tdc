import type { Task } from "./task.types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsGrid,
} from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import CardField from "../UI/CardField";
import StatCard from "../UI/StatCard";

export type ViewProps = {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
};
export default function View({ ...props }: ViewProps) {
  const { t } = useTranslation(["task"]);

  function formatOdometer(km: number): string {
    return new Intl.NumberFormat("vi-VN").format(km) + " km";
  }

  return (
    <div>
      <StatsGrid>
        <StatCard label={t("code")} value={props.task.code} />
        <StatCard label={t("name")} value={props.task.name} />
        <StatCard label={t("durationHours")} value={props.task.durationHours} />
        <StatCard label={t("skillLevel")} value={props.task.skillLevel} />
        <StatCard label={t("isActive")} value={props.task.isActive} />
      </StatsGrid>
      <Card>
        <CardHeader>
          <CardTitle>{t("taskInformation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardField label={t("code")} value={props.task.code} />
          <CardField label={t("name")} value={props.task.name} />
          <CardField label={t("durationHours")} value={props.task.durationHours} />
          <CardField label={t("skillLevel")} value={props.task.skillLevel} />
          <CardField label={t("isActive")} value={props.task.isActive} />
          <CardField label={t("brandId")} value={props.task.brandId} />
          <CardField label={t("createdBy")} value={props.task.createdBy} />
          <CardField label={t("createdAt")} value={props.task.createdAt} />
          <CardField label={t("updatedAt")} value={props.task.updatedAt} />
        </CardContent>
      </Card>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onEdit}>
          Edit Task
        </Button>
      </div>
    </div>
  );
}
