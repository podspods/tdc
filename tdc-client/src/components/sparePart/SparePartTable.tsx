// client/src/components/SparePart/SparePartTable.tsx
import type { SparePart } from "./sparePart.types";
import { Table, Th, Td } from "../../common/common.styled"; // adjust import according to your styled components location
import { ActionIcon, Actions } from "./Badge.styled";
import { Tr } from "./SparePartRow.styled";

type SparePartTableProps = {
  data: SparePart[];
  onEdit: (part: SparePart) => void;
  onDelete: (id: number) => void;
};

/**
 * Helper function to truncate text to a maximum length.
 * @param text - The original text.
 * @param maxLength - Maximum allowed length (default 50).
 * @returns Truncated string with ellipsis if needed.
 */
const truncateText = (text: string | undefined, maxLength: number = 50): string => {
  if (!text) return "-";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "…";
};

/**
 * Formats a number as Vietnamese Dong (VND).
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function SparePartTable({ data, onEdit, onDelete }: SparePartTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Code</Th>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Selling Price</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((part) => (
          <Tr key={part.id}>
            <Td>{part.code}</Td>
            <Td>{part.name}</Td>
            <Td>{truncateText(part.description)}</Td>
            <Td>{formatCurrency(part.sellingPrice)}</Td>
            <Td>
              <Actions>
                <ActionIcon onClick={() => onEdit(part)} title="Edit">
                  ✏️
                </ActionIcon>
                <ActionIcon onClick={() => onDelete(part.id)} title="Delete">
                  🗑️
                </ActionIcon>
              </Actions>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
