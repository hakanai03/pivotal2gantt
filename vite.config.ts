import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import inject from '@rollup/plugin-inject'

// ref: https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  server: {
    host: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [inject({Buffer: ['buffer', 'Buffer']})],
    },
  },
})

