import { type UserConfig, mergeConfigs, presetIcons, presetUno } from "unocss";

export default (config: UserConfig) =>
  mergeConfigs([
    config,
    {
      presets: [
        presetUno(),
        presetIcons({
          warn: true,
          cdn: "https://esm.sh/",
        }),
      ],
    },
  ]);
