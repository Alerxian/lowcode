import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm'],
  outDir: 'dist/esm',
  dts: true,
  sourcemap: true,
  minify: true,
})
