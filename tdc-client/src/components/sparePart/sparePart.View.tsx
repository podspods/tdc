import type { SparePart } from "./sparePart.types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsGrid,
} from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import CardField from "../UI.v0/CardField";
import StatCard from "../UI.v0/StatCard";

export type ViewProps = {
  sparePart: SparePart;
  onClose: () => void;
  onEdit: () => void;
};
export default function View({ ...props }: ViewProps) {
  const { t } = useTranslation(["sparePart"]);

  return (
    <div>
      <StatsGrid>
        <StatCard label={t("code")} value={props.sparePart.code} />
        <StatCard label={t("name")} value={props.sparePart.name} />
        <StatCard label={t("description")} value={props.sparePart.description || ""} />
        <StatCard label={t("purchasePrice")} value={props.sparePart.purchasePrice} />
        <StatCard label={t("sellingPrice")} value={props.sparePart.sellingPrice} />
        <StatCard label={t("markupMultiplier")} value={props.sparePart.markupMultiplier} />
        <StatCard label={t("stockQuantity")} value={props.sparePart.stockQuantity} />
        <StatCard label={t("supplier")} value={props.sparePart.supplier || ""} />
        <StatCard label={t("isActive")} value={props.sparePart.isActive} />
      </StatsGrid>
      <Card>
        <CardHeader>
          <CardTitle>{t("sparePartInformation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardField label={t("code")} value={props.sparePart.code} />
          <CardField label={t("name")} value={props.sparePart.name} />
          <CardField label={t("description")} value={props.sparePart.description || ""} />
          <CardField label={t("purchasePrice")} value={props.sparePart.purchasePrice} />
          <CardField label={t("sellingPrice")} value={props.sparePart.sellingPrice} />
          <CardField label={t("markupMultiplier")} value={props.sparePart.markupMultiplier} />
          <CardField label={t("stockQuantity")} value={props.sparePart.stockQuantity} />
          <CardField label={t("supplier")} value={props.sparePart.supplier || ""} />
          <CardField label={t("isActive")} value={props.sparePart.isActive} />
        </CardContent>
      </Card>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button variant="secondary" onClick={props.onClose}>
          {t("close")}
        </Button>
        <Button variant="primary" onClick={props.onEdit}>
          {t("editSparePart")}
        </Button>
      </div>
    </div>
  );
}
