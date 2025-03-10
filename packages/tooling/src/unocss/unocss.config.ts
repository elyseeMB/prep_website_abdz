import {
  type UserConfig,
  mergeConfigs,
  // presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from "unocss";
import { themeColors } from "./tokens.js";

export default (config: UserConfig) =>
  mergeConfigs([
    config,
    {
      presets: [
        presetUno(),
        presetWebFonts({
          provider: "none",
          fonts: {
            sans: "Geist",
            mono: "sans-serif",
          },
        }),

        // presetIcons({
        //   warn: true,
        //   cdn: "https://esm.sh/",
        // }),
      ],
      transformers: [transformerDirectives()],
      theme: {
        colors: {
          // Mode clair
          dark: themeColors.light.dark,
          color: themeColors.light.primary.DEFAULT,
          "color-light": themeColors.light.primary.light,
          "color-inversed": themeColors.light.inversed.DEFAULT,
          "color-inversed60": themeColors.light.inversed.light,
          contrast: themeColors.light.contrast.DEFAULT,
          "contrast-25": themeColors.light.contrast[25],
          border: themeColors.light.border.DEFAULT,
          "border-light": themeColors.light.border.light,
          background: themeColors.light.background.DEFAULT,
          "background-light": themeColors.light.background.light,
          shadow: themeColors.light.shadow,
          "list-hover": themeColors.light.listHover,
          play: themeColors.light.play,
          red: themeColors.light.status.red,
          green: themeColors.light.status.green,
          yellow: themeColors.light.status.yellow.DEFAULT,
          "yellow-alpha": themeColors.light.status.yellow.alpha,
          selection: themeColors.light.selectionBackground,

          // Mode sombre (dark:)
          "dark-dark": themeColors.dark.dark,
          "dark-color": themeColors.dark.primary.DEFAULT,
          "dark-color-light": themeColors.dark.primary.light,
          "dark-inversed": themeColors.dark.inversed.DEFAULT,
          "dark-inversed60": themeColors.dark.inversed.light,
          "dark-contrast": themeColors.dark.contrast.DEFAULT,
          "dark-border": themeColors.dark.border.DEFAULT,
          "dark-border-light": themeColors.dark.border.light,
          "dark-background": themeColors.dark.background.DEFAULT,
          "dark-background-light": themeColors.dark.background.light,
          "dark-card-bg": themeColors.dark.card.bg,
          "dark-card-bg-footer": themeColors.dark.card.bgFooter,
          "dark-shadow": themeColors.dark.shadow,
          "dark-play": themeColors.dark.play,
          "dark-list-hover": themeColors.dark.listHover,
          "dark-skeleton": themeColors.dark.skeleton.DEFAULT,
          "dark-skeleton-wave": themeColors.dark.skeleton.wave,
          "dark-red": themeColors.dark.status.red,
          "dark-selection": themeColors.dark.selectionBackground,
          "dark-header-background": themeColors.dark.header.background,
          "dark-header-background-inversed":
            themeColors.dark.header.backgroundInversed,
        },
      },
      rules: [
        ["bg-taxonomy", { "background-color": "#a1f3ff" }],
        ["bg-state", { "background-color": "#ffff9cd1" }],
      ],
    },
  ]);
