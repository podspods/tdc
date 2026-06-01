import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  StatLabel,
  StatsGrid,
  StatValue,
} from "../../common/common.styled";
import type { OwnerStats } from "./owner.types";
import { formatCurrency } from "../../common/common";

export type StatsProps = {
  stats: OwnerStats;
};
export default function Stats({ ...props }: StatsProps) {
  const { t } = useTranslation(["owner"]);

  return (
    <>
      <StatsGrid>
        <StatCard>
          <StatValue>{props.stats.total}</StatValue>
          <StatLabel> {t("totalOwners")}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{props.stats.active}</StatValue>
          <StatLabel> {t("active")}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{props.stats.inactive}</StatValue>
          <StatLabel> {t("inactive")}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{props.stats.blocked}</StatValue>
          <StatLabel> {t("blocked")}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(props.stats.totalSpentAll)}</StatValue>
          <StatLabel> {t("totalRevenue")}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(props.stats.averageSpentPerOwner)}</StatValue>
          <StatLabel> {t("averageSpent")}</StatLabel>
        </StatCard>
      </StatsGrid>
      <Card>
        <CardHeader>
          <CardTitle> {t("byCategory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div>
              {t("basic")}: {props.stats.byCategory.basic}
            </div>
            <div>
              {t("important")}: {props.stats.byCategory.important}
            </div>
            <div>
              {t("vip")}: {props.stats.byCategory.vip}
            </div>
            <div>
              {t("gold")}: {props.stats.byCategory.gold}
            </div>
            <div>
              {t("platinum")}: {props.stats.byCategory.platinum}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
