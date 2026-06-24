// frontend/src/components/partAndLabor/PartAndLabor.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../theme";
import { partAndLaborInit } from "../../common/constant";
import type { PartAndLabor } from "./types";

const mockPartAndLabor: PartAndLabor = {
  ...partAndLaborInit,
  id: 1,
  typeLineCode: "TA",
  categoryCode: "MA",
  subCategoryCode: "EN",
  brandCode: "DU",
  duration: 60,
  skillLevel: 2,
  cost: 100,
  margin: 30,
  code: "TA-MA-EN-DU-1",
  name: "Oil Change - Ducati",
  description: "Complete oil change service for Ducati motorcycles",
  createdBy: "admin",
};

export default {
  title: "Components/PartAndLabor",
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => (
  <div>
    <h1>Part And Labor</h1>
    <pre>{JSON.stringify(mockPartAndLabor, null, 2)}</pre>
  </div>
);

export const Default = Template.bind({});
