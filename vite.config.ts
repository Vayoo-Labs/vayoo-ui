import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.SOME_ENV': `"${process.env.SOME_ENV}"`
  },
  build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'], process: 'process'})],
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
        // NodeModulesPolyfillPlugin() 
      ]
    }
  }, 
})
