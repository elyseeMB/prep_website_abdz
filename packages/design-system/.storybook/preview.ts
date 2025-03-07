import type { Preview } from "@storybook/react";
import "../src/css/index.css";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

globalThis.Eembouz = {
  appUrl: "http://localhost:3333",
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
