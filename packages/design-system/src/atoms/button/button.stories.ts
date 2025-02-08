import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.tsx";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  //   tags: ["autodocs"],
  title: "Atoms/Button",
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const primary: Story = {
  args: {
    primary: true,
    children: "Button +",
  },
};
