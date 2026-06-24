// src/components/invoice/ModalCreateInvoiceLine.stories.tsx
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/theme";
import { Button } from "../../common/common.styled";
import type { Meta, StoryFn } from "@storybook/react-vite";
// import { action } from "@storybook/addon-actions";

// Mock data for options
const mockTypeLineOptions = [
  { value: 1, label: "Service / Labor" },
  { value: 2, label: "Spare Part" },
  { value: 3, label: "Consumable" },
  { value: 4, label: "Accessory" },
  { value: 5, label: "Warranty" },
];

export default {
  title: "Components/invoice/ModalCreateInvoiceLine",
  component: ModalCreateInvoiceLine,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "Controls modal visibility",
    },
    typeLineId: {
      control: { type: "number" },
      defaultValue: 1,
      description: "Type of line (1=Service, 2=Part, etc.)",
    },
    onClose: { action: "onClose" },
  },
  parameters: {
    docs: {
      description: {
        component: "Modal for creating a new invoice line (service, spare part, consumable, etc.).",
      },
    },
  },
} as Meta<ModalCreateInvoiceLineProps>;

// Wrapper component to handle modal state
const ModalWithToggle = (args: ModalCreateInvoiceLineProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button $variant="primary" onClick={handleOpen}>
        + Add Invoice Line
      </Button>
      <ModalCreateInvoiceLine {...args} isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

// Template for basic usage
const Template: StoryFn<ModalCreateInvoiceLineProps> = (args) => <ModalWithToggle {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  typeLineId: 1,
  //   onClose: actions("onClose"),
};
Default.parameters = {
  docs: {
    storyDescription: "Default modal for creating an invoice line",
  },
};

// Service line type
export const ServiceLine = Template.bind({});
ServiceLine.args = {
  isOpen: true,
  typeLineId: 1, // Service/Labor
  //   onClose: actions("onClose"),
};
ServiceLine.parameters = {
  docs: {
    storyDescription: "Modal for creating a service/labor line",
  },
};

// Spare part line type
export const SparePartLine = Template.bind({});
SparePartLine.args = {
  isOpen: true,
  typeLineId: 2, // Spare Part
  //   onClose: actions("onClose"),
};
SparePartLine.parameters = {
  docs: {
    storyDescription: "Modal for creating a spare part line",
  },
};

// Consumable line type
export const ConsumableLine = Template.bind({});
ConsumableLine.args = {
  isOpen: true,
  typeLineId: 3, // Consumable
  //   onClose: actions("onClose"),
};
ConsumableLine.parameters = {
  docs: {
    storyDescription: "Modal for creating a consumable line (oil, filters, etc.)",
  },
};
