import { Meta, StoryObj } from "@storybook/react";
import { Icon, iconNames } from "./icon.tsx";

const meta = {
  component: Icon,
  title: "Atoms/Icon",
  argTypes: {
    name: {
      options: iconNames,
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: "i-ri-admin-fill",
  },
};
