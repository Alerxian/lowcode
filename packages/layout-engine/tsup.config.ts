import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    clean: true,
    format: ['esm'],
    dts: true,
    sourcemap: true,
    target: 'esnext',
    minify: true,
    outDir: 'dist/esm',
  },
  {
    entry: ['src/index.ts'],
    clean: true,
    format: ['cjs'],
    dts: true,
    sourcemap: true,
    target: 'esnext',
    minify: true,
    outDir: 'dist/cjs',
  },
])
