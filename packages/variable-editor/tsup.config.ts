import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm'],
  outDir: 'dist/esm',
  plugins: [],
  dts: true,
  sourcemap: true,
  minify: true,
  publicDir: 'src/assets',
  loader: {
    '.svg': 'file',
  },
})
