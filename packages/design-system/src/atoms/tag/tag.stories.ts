import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./tag.tsx";

const meta = {
  component: Tag,
  title: "Atoms/tag",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {
  argTypes: {
    children: {
      control: "text",
    },
  },
};
