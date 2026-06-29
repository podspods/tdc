import { useTranslation } from "react-i18next";
import { ActionIcon, Actions, Code, StatusBadge, Supplier } from "./Badge.styled";
import type { SparePart } from "./sparePart.types";
import { Sticker } from "../UI.v0/Sticker";
import { Card, Header, InfoGrid, Title } from "../../common/common.styled";

export type BadgeProps = {
  sparePart: SparePart;
  onEdit: (sparePart: SparePart) => void;
  onDelete: (id: number) => void;
  onUpdateStock?: (id: number, newQuantity: number) => void;
};

export default function Badge({ ...props }: BadgeProps) {
  const { t } = useTranslation(["sparePart"]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleStockModify = () => {
    const newStock = prompt(
      "Nouvelle quantité en stock :",
      props.sparePart.stockQuantity.toString(),
    );
    if (newStock !== null && !isNaN(Number(newStock))) {
      props.onUpdateStock?.(props.sparePart.id, Number(newStock));
    }
  };

  return (
    <Card key={props.sparePart.id}>
      <Header>
        <div>
          <Title>{props.sparePart.name}</Title>
          <Code>{props.sparePart.code}</Code>
          <StatusBadge $active={props.sparePart.isActive === 1}>
            {props.sparePart.isActive === 1 ? "Actif" : "Inactif"}
          </StatusBadge>
        </div>
        <Actions>
          <ActionIcon onClick={() => props.onEdit(props.sparePart)} title="Modifier">
            ✏️
          </ActionIcon>
          <ActionIcon onClick={handleStockModify} title="Modifier le stock">
            📦
          </ActionIcon>
          <ActionIcon onClick={() => props.onDelete(props.sparePart.id)} title="Supprimer">
            🗑️
          </ActionIcon>
        </Actions>
      </Header>

      <InfoGrid>
        <Sticker
          label={t("purchasePrice")}
          icon="💰"
          value={formatCurrency(props.sparePart.purchasePrice)}
          isVisible={false}
        />
        <Sticker
          label={t("sellingPrice")}
          icon="🏷️"
          value={formatCurrency(props.sparePart.sellingPrice)}
        />
        <Sticker
          label={t("markupMultiplier")}
          icon="📈"
          value={props.sparePart.markupMultiplier}
          isVisible={false}
        />
        <Sticker
          label={t("stockQuantity")}
          icon="📦"
          value={props.sparePart.stockQuantity}
          color={props.sparePart.stockQuantity <= 5}
        />

        {props.sparePart.description && (
          <InfoRow style={{ gridColumn: "1 / -1" }}>
            <Label title={t("description")}>📝</Label>
            <Value>{props.sparePart.description}</Value>
          </InfoRow>
        )}
      </InfoGrid>

      <Supplier>
        <span>
          🏭 <strong>Fournisseur :</strong> {props.sparePart.supplier || "—"}
        </span>
        <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
          Créé le {new Date(props.sparePart.createdAt).toLocaleDateString()}
        </span>
      </Supplier>
    </Card>
  );
}
