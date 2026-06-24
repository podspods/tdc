// client/src/components/SparePart/SparePartRow.tsx
import { ActionIcon, Actions } from "./Badge.styled";
import type { SparePart } from "./sparePart.types";
import { Td, Tr } from "./SparePartRow.styled";

type SparePartRowProps = {
  sparePart: SparePart;
  onEdit: (part: SparePart) => void;
  onDelete: (id: number) => void;
};

/**
 * Table row component for a single spare props.sparePart.
 * Displays code, name, selling price, stock quantity, active status, and action buttons.
 */
export function SparePartRow({ ...props }: SparePartRowProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Tr>
      <Td>{props.sparePart.code}</Td>
      <Td>{props.sparePart.name}</Td>
      <Td>{formatCurrency(props.sparePart.sellingPrice)}</Td>
      <Td>{props.sparePart.stockQuantity}</Td>
      <Td>{props.sparePart.isActive === 1 ? "Active" : "Inactive"}</Td>
      <Td>
        <Actions>
          <ActionIcon onClick={() => props.onEdit(props.sparePart)} title="Edit">
            ✏️
          </ActionIcon>
          <ActionIcon onClick={() => props.onDelete(props.sparePart.id)} title="Delete">
            🗑️
          </ActionIcon>
        </Actions>
      </Td>
    </Tr>
  );
}
