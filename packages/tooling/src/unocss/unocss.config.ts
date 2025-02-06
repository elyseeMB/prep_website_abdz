import { type UserConfig, mergeConfigs, presetIcons } from "unocss";

export default (config: UserConfig) =>
  mergeConfigs([
    config,
    {
      presets: [
        presetIcons({
          cdn: "https://esm.sh/",
        }),
      ],
    },
  ]);
