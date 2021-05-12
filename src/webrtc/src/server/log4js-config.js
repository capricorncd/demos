/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-31 22:27
 */
module.exports = {
  appenders: {
    file: {
      type: 'file',
      filename: 'app.log',
      layout: {
        type: 'pattern',
        pattern: '%r $p - %m',
      }
    }
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug',
    }
  },
}
