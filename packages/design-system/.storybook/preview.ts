import type { Preview } from "@storybook/react";
import "../src/css/index.css";
// import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
