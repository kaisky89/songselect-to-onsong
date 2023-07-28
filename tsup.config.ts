import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/songselectToOnsong.ts'],
  format: 'esm',
  outExtension: () => ({
    js: '.js',
  }),
  clean: true,
})
