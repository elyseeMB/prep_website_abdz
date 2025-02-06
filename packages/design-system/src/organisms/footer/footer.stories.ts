import { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer.tsx";

const meta = {
  component: Footer,
  title: "Organisms/Footer",
  parameters: {
    layout: "padded",
  },
} as Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
