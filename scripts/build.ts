import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/constants.ts',
    './src/number.ts',
    './src/vector2.ts',
    './src/matrix2D.ts',
    './src/box.ts',
    './src/size.ts',
    './src/style.ts',
    './src/random.ts',
    './src/easing.ts'
  ],
  outdir: './dist',
  minify: false,
  plugins: [dts()],
  external: ['@figureland/mathkit']
})
