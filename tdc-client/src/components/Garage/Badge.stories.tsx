import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/theme"; // ajustez le chemin selon votre projet
import { _getGarageById } from "./garage.service";
import type { Garage } from "./garage.types";
import Badge from "./Badge";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { garageInit } from "../../common/constant";

// Mock data for different garages
const mockGarages: Record<number, Garage> = {
  1: {
    ...garageInit,
    id: 1,
    name: "Ducati Paris",
    address: "12 Rue de la Passion",
    city: "Paris",
    phone: "+33 1 23 45 67 89",
    logoUrl: "images/logo-MinhTek.png",
    email: "contact@ducati-paris.fr",
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  2: {
    ...garageInit,

    id: 2,
    name: "Ducati Lyon",
    address: "45 Avenue des Sports",
    city: "Lyon",
    phone: "+33 4 98 76 54 32",
    logoUrl: "https://via.placeholder.com/150?text=Ducati+Lyon",
    email: "contact@ducati-lyon.fr",
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    zipcode: "700000",
  },
  3: { ...garageInit },
};
// Mock fetch function for Storybook
const mockFetchGarage = async (id: number) => {
  const data = mockGarages[id];
  return data
    ? { success: true, data, message: "OK" }
    : { success: false, message: "Garage not found", data: undefined };
};

export default {
  title: "Components/Garage/badge",
  component: Badge,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Affiche les informations d’un garage (logo, adresse, téléphone). Les données sont chargées via `_getGarageById`.",
      },
    },
  },
  argTypes: {
    id: {
      control: { type: "number", min: 1, max: 2, step: 1 },
      description: "ID du garage à afficher (1 ou 2 dans les mocks)",
      defaultValue: 1,
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} fetchGarage={mockFetchGarage} />;

export const Default = Template.bind({});
Default.args = { id: 1 };

export const AnotherGarage = Template.bind({});
AnotherGarage.args = { id: 2 };

export const WithoutLogo = Template.bind({});
WithoutLogo.args = { id: 1 };
WithoutLogo.decorators = [
  (Story) => {
    // Temporarily remove logoUrl from mock
    const originalLogo = mockGarages[1].logoUrl;
    mockGarages[1].logoUrl = "";
    const result = <Story />;
    mockGarages[1].logoUrl = originalLogo;
    return result;
  },
];
WithoutLogo.parameters = {
  docs: {
    storyDescription: "Cas où le garage n’a pas de logo (le composant ne rend pas l’image)",
  },
};
