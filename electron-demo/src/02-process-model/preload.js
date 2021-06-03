/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:46
 */
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', process.versions)
