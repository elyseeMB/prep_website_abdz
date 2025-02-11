import defineConfig from "@packages/tooling/unocss";

export default defineConfig({
  theme: {
    colors: {
      bg_primary: `linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.16) 100%
      ),
      #7e5aff;`,
      color_secondary: `rgb(74 80 92)`,
    },
    boxShadow: {
      small: `0 0 0 1px rgba(126 90 255 / 1),
        0 1.5px 2px 0 rgba(0 0 0 / 0.24);`,
    },
  },
});
