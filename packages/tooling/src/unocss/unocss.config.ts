import {
  type UserConfig,
  mergeConfigs,
  // presetIcons,
  presetUno,
  transformerDirectives,
} from "unocss";

export default (config: UserConfig) =>
  mergeConfigs([
    config,
    {
      presets: [
        presetUno(),
        // presetIcons({
        //   warn: true,
        //   cdn: "https://esm.sh/",
        // }),
      ],
      transformers: [transformerDirectives()],
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
      rules: [
        ["bg-taxonomy", { "background-color": "#a1f3ff" }],
        ["bg-state", { "background-color": "#ffff9cd1" }],
      ],
    },
  ]);
