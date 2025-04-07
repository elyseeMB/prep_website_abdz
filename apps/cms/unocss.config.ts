import defineConfig from '@packages/tooling/unocss'

export default defineConfig({
  content: {
    filesystem: ['./inertia/**/*.tsx', './node_modules/@website/design-system/**/*.tsx'],
  },
  shortcuts: {
    btn_sidebar:
      'px-2 py-1 hover:bg-#d6d6d65e font-500 transition-2 text-sm rounded-lg opacity-50 hover:opacity-100',
  },
})
