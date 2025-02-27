import { Meta, StoryObj } from "@storybook/react";

import { TableElement } from "./tableElement.tsx";

const meta = {
  component: TableElement,
  title: "Organisms/Table",
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TableElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
