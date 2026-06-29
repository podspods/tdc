import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormGroup from "./FormGroup";

// Composant wrapper pour gérer l’état (contrôlé)
const FormGroupWithState = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange?.(e);
  };
  return <FormGroup {...args} value={value} onChange={handleChange} />;
};

const meta = {
  title: "UI/FormGroup",
  component: FormGroupWithState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof FormGroupWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Valeur texte
export const TextInput: Story = {
  args: {
    label: "First Name",
    name: "firstName",
    value: "John",
  },
};

// ✅ Valeur nombre
export const NumberInput: Story = {
  args: {
    label: "Age",
    name: "age",
    value: 25,
  },
};

// ✅ Valeur booléenne (affichée comme "true"/"false")
export const BooleanInput: Story = {
  args: {
    label: "Active",
    name: "isActive",
    value: true,
  },
};

// ✅ Valeur par défaut vide
export const EmptyInput: Story = {
  args: {
    label: "City",
    name: "city",
    value: "",
  },
};
