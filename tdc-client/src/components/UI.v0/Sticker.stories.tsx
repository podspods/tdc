// client/src/components/SparePart/Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import type { SparePart } from "../sparePart/sparePart.types";
import { Sticker } from "./Sticker";

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
  title: "UI/Sticker",
  component: Sticker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {},
    icon: {},
    value: {},
  },
  args: {
    label: "default label",
    icon: "💰",
    value: "default Value",
  },
} satisfies Meta<typeof Sticker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Histoire par défaut
export const Default: Story = {};

// Stock bas (alerte)
export const IsVisible: Story = {
  args: {
    label: "not set visible label",
    icon: "EY",
    value: "is visible value not set",
  },
};

export const IsNotVisible: Story = {
  args: {
    label: "not visible label",
    icon: "EY",
    value: "not visible value",
    isVisible: false,
  },
};

export const IsVisibleTru: Story = {
  args: {
    label: "visible label",
    icon: "EY",
    value: "visible value",
    isVisible: true,
  },
};

export const lowThreshold: Story = {
  args: {
    label: "alert value",
    icon: "📦",
    value: "alert value",
    isVisible: true,
    color: true,
  },
};
