const path = require('path')
const fs = require('fs')

const staticDir = path.resolve(__dirname, '../public/static')

function main() {
  const targetImages = []
  fs.readdirSync(staticDir).forEach(file => {
    if (file.endsWith('.jpg')) handleFile(file, targetImages)
  })
  // console.log(targetImages)
  const output = `export const bgImages = ${JSON.stringify(targetImages)}`
  fs.writeFileSync(path.resolve(__dirname, '../src/components/GitHub/bg-images.js'), output)
}

function handleFile(file, targetImages) {
  const stat = fs.statSync(path.join(staticDir, file))
  if (stat.size / 1024 > 100) targetImages.push(`./static/${file}`)
}

main()
