import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'iife',
  outExtension: () => ({
    js: '.js',
  }),
  clean: true,
})
