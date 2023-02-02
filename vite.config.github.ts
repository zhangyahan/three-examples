import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const input: { [name: string]: string } = {
  main: resolve(__dirname, 'index.html'),
}
const examples = fs.readdirSync(resolve(__dirname, 'examples'))
for (const example of examples) {
  const files = fs.readdirSync(resolve(__dirname, 'examples', example))
  for (const file of files) {
    if (file.endsWith('.html')) {
      input[file.slice(0, -5)] = resolve(__dirname, `examples/${example}/${file}`)
    }
  }
}
module.exports = defineConfig({
  base: '/three-examples/',
  build: {
    rollupOptions: {
      input,
    },
  },
})
