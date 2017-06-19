var _ = require('lodash')
var path = require('path')
require('babel-register')

var defaults = require('./nightwatch.conf.js')

module.exports = _.merge(defaults, {
  globals_path: path.join(__dirname, './nightwatch.chrome.globals.js'),

  selenium: {
    start_process: false
  },

  test_settings: {
    default: {
      selenium_port: 9515,
      default_path_prefix: '',

      desiredCapabilities: {
        browserName: 'chrome',
        acceptSslCerts: true,

        // https://sites.google.com/a/chromium.org/chromedriver/capabilities#TOC-chromeOptions-object
        chromeOptions: {
          args: ['--no-sandbox']
        }

      }

    }
  }

})
