// client/src/components/SparePart/Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import type { SparePart } from "./sparePart.types";
import Badge from "./Badge";

// Données mockées
const mockSparePart: SparePart = {
  id: 1,
  code: "BRK-001",
  name: "Plaquettes de frein avant",
  description: "Jeu de plaquettes semi-métalliques pour disque 320mm",
  purchasePrice: 180000,
  sellingPrice: 320000,
  markupMultiplier: 1.78,
  stockQuantity: 12,
  supplier: "BrakeWorld",
  isActive: 1,
  createdBy: "admin",
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z",
};

const lowStockPart: SparePart = {
  ...mockSparePart,
  id: 2,
  code: "ENG-002",
  name: "Bougie Iridium",
  stockQuantity: 3,
  isActive: 1,
};

const inactivePart: SparePart = {
  ...mockSparePart,
  id: 3,
  code: "CON-001",
  name: "Huile moteur (obsolète)",
  isActive: 0,
  stockQuantity: 0,
};

const meta = {
  title: "SparePart/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onEdit: { action: "edit" },
    onDelete: { action: "delete" },
    onUpdateStock: { action: "updateStock" },
  },
  args: {
    sparePart: mockSparePart,
    onEdit: (sparePart) => console.log("Edit", sparePart),
    onDelete: (id) => console.log("Delete", id),
    onUpdateStock: (id, qty) => console.log("Update stock", id, qty),
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Histoire par défaut
export const Default: Story = {};

// Stock bas (alerte)
export const LowStock: Story = {
  args: {
    sparePart: lowStockPart,
  },
};

// Pièce inactive
export const Inactive: Story = {
  args: {
    sparePart: inactivePart,
  },
};

// Avec description longue
export const WithLongDescription: Story = {
  args: {
    sparePart: {
      ...mockSparePart,
      description:
        "Cet article est conçu pour les conditions extrêmes. Il résiste à des températures allant de -20°C à 150°C. Une installation professionnelle est recommandée.",
      stockQuantity: 25,
    },
  },
};

// Sans fournisseur
export const NoSupplier: Story = {
  args: {
    sparePart: {
      ...mockSparePart,
      supplier: undefined,
    },
  },
};
