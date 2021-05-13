/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-03-07 14:05
 */
const replace = require('replace-in-file')
const { resolve } = require('path')

async function removeStaticPath() {
  const options = {
    files: resolve(__dirname, '../../../capricorncd.github.io/demos/webgl/**/*\.js'),
    from: /"\w+\/img\//g,
    // from: /static\/\w+\/img\//g,
    to: '"'
  }
  try {
    const results = await replace(options)
    console.log('Replacement results:', results)
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

removeStaticPath()
