import typescript from 'rollup-plugin-typescript3'
import path from 'path'

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: [{
    name: 'ContextMenu',
    file: path.resolve(__dirname, 'dist/contextmenu.esm.js'),
    format: 'esm'
  }],
  plugins: [
    typescript()
  ]
}
