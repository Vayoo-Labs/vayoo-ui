import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'

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
})
