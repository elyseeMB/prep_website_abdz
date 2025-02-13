import { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormPrimaryButton,
  FormSecondaryButton,
  FormField,
} from "./form.tsx";

const meta = {
  component: Form,
  title: "Molecules/Form",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: [
      Array.from({ length: 3 }, (_, k) => FormField({ name: "usename" })),
      FormField({ name: "usename", type: "textarea" }),
      FormPrimaryButton({ children: "je suis le button" }),
      FormSecondaryButton({
        children: "je suis le button secondaire",
      }),
    ],
  },
};
