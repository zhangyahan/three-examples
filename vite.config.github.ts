import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const input: { [name: string]: string } = {
  main: resolve(__dirname, 'index.html'),
}
const example = fs.readdirSync(resolve(__dirname, 'examples'))
for (const file of example) {
  if (file.endsWith('.html')) {
    input[file.slice(0, -5)] = resolve(__dirname, `example/${file}`)
  }
}
module.exports = defineConfig({
  base: '/three-example/',
  build: {
    rollupOptions: {
      input,
    },
  },
})
