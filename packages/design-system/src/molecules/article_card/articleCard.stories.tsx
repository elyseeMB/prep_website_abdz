import { Meta, StoryObj } from "@storybook/react";
import { ArticleCard } from "./articleCard.tsx";

const meta = {
  component: ArticleCard,
  title: "Molecules/article Card",
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
