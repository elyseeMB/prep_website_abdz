import { Meta, StoryObj } from "@storybook/react";
import { Field } from "./field.tsx";
// import { typeElement } from "./field.tsx";

const meta = {
  component: Field,
  title: "Molecules/Field",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const WithLabel: Story = {
  args: {
    children: "je suis le children",
  },
};

export const Textarea: Story = {
  args: {
    type: "textarea",
  },
};

export const checkbox: Story = {
  args: {
    type: "checkbox",
  },
};
