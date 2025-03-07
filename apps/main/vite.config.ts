import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import UnoCss from 'unocss/vite'
import prefresh from '@prefresh/vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    allowedHosts: ['d501-2c0f-ef58-1656-3b00-e98c-eb73-f15c-c8db.ngrok-free.app', 'localhost'],
  },
  plugins: [
    adonisjs({
      entrypoints: ['ressources/css/app.cs', 'resources/js/app.jsx'],
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
    UnoCss(),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})

/**
 * @type { import('vite').UserConfig }
 */
// const config = {
//   resolve: {
//     alias: {
//       'react': 'preact/compat',
//       'react-dom': 'preact/compat',
//     },
//   },
//   emitManifest: true,
//   cors: true,
//   optimizeDeps: {
//     include: ['preact/hooks', 'preact/compat', 'htm/mini'],
//   },
//   esbuild: {
//     jsxFactory: 'h',
//     jsxFragment: 'Fragment',
//     jsxInject: `import { h, Fragment } from 'preact'`,
//   },
//   base: '/assets/',
//   build: {
//     polyfillDynamicImport: false,
//     assetsDir: '',
//     manifest: true,
//     outDir: '../public/assets/',
//     rollupOptions: {
//       output: {
//         manualChunks: undefined, // Désactive la séparation du vendor
//       },
//       input: {
//         app: resolve(__dirname, 'assets/app.js'),
//         admin: resolve(__dirname, 'assets/admin.js'),
//       },
//     },
//   },
//   plugins: [prefresh],
//   root: resolve(__dirname, './resources'),
// }

// module.exports = config
