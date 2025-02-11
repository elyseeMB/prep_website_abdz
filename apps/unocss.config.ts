import defineConfig from '@packages/tooling/unocss'

export default defineConfig({
  content: {
    filesystem: ['./inertia/**/*.tsx', './node_modules/@website/design-system/**/*.tsx'],
  },
})
