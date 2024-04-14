import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/style.ts',
    './src/vector2.ts',
    './src/matrix2D.ts',
    './src/box.ts'
  ],
  outdir: './dist',
  minify: false,
  plugins: [dts()]
})
