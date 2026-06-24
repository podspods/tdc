// src/components/invoice/ActionBar.stories.tsx
import type { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import ActionBar, { type ActionBarProps } from "./ActionBar";
import { lightTheme } from "../../styles/theme";
import { InvoiceState } from "./types";

// Fonctions factices pour les actions (log dans la console)
const mockSetDummyNumber = () => console.log("setDummyNumber called");
const mockResetGenerating = () => console.log("resetGenerating called");
const mockCreateNewInvoice = () => console.log("CreateNewInvoice called");

export default {
  title: "Components/invoice/ActionBar",
  component: ActionBar,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    invoiceState: {
      control: { type: "select" },
      options: [0, 1, 2, 3],
      mapping: {
        0: InvoiceState.InitState,
        1: InvoiceState.View,
        2: InvoiceState.Edit,
        3: InvoiceState.Create,
      },
      description: "État actuel de la facture (0=Init, 1=View, 2=Edit, 3=Create)",
    },
    dummyNumber: {
      control: { type: "number" },
      description: "Numéro fictif pour le chargement des données",
    },
    generatingId: {
      control: { type: "number" },
      description: "ID de la facture en cours de génération PDF",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Barre d’action affichant le titre, l’état de la facture et des boutons pour réinitialiser, charger des données factices ou créer une nouvelle facture.",
      },
    },
  },
} as Meta<ActionBarProps>;

const Template: StoryFn<ActionBarProps> = (args) => <ActionBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  invoiceState: InvoiceState.InitState,
  dummyNumber: 42,
  generatingId: 0,
  setDummyNumber: mockSetDummyNumber,
  resetGenerating: mockResetGenerating,
  CreateNewInvoice: mockCreateNewInvoice,
};

export const EditMode = Template.bind({});
EditMode.args = {
  ...Default.args,
  invoiceState: InvoiceState.Edit,
  dummyNumber: 100,
  generatingId: 5,
};

export const CreateMode = Template.bind({});
CreateMode.args = {
  ...Default.args,
  invoiceState: InvoiceState.Create,
  dummyNumber: 0,
  generatingId: 0,
};

export const PdfGenerating = Template.bind({});
PdfGenerating.args = {
  ...Default.args,
  invoiceState: InvoiceState.View,
  dummyNumber: 99,
  generatingId: 123,
};
