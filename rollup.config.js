import typescript from 'rollup-plugin-typescript3'
import path from 'path'

const pkg = require('./package.json')
const date = new Date()
const banner = `/*! Contextmenu v${pkg.version}
* Copyright (c) ${date.getFullYear()} ${pkg.author}
* Licensed under the ${pkg.license} License
* https://github.com/calebpitan/contextmenu/blob/master/LICENSE
* Build Date: ${date.toISOString()}
*/`
export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: [{
    name: 'ContextMenu',
    file: path.resolve(__dirname, `dist/contextmenu${process.env.ESM === 'true' ? '.esm' : ''}.js`),
    format: process.env.ESM === 'true' ? 'esm' : 'umd',
    banner
  }],
  plugins: [
    typescript()
  ]
}
