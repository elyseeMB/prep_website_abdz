import { Meta, StoryObj } from "@storybook/react";
import { Icon, IconName } from "./icon.tsx";

const meta = {
  component: Icon,
  title: "Atoms/Icon",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  argTypes: {
    name: {
      options: IconName,
    },
  },
  args: {
    name: "close",
  },
};
