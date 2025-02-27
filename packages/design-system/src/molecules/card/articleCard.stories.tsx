import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./articleCard.tsx";

const meta = {
  component: Card,
  title: "Molecules/article Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
