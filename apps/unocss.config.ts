import defineConfig from '@packages/tooling/unocss'

export default defineConfig({
  content: {
    filesystem: ['./inertia/**/*.vue', './node_modules/@rlanz/design-system/**/*.vue'],
  },
})
