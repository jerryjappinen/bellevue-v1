var path = require('path')
require('babel-register')

var config = require('../../tooling/env')
var aliases = require('../../src/config/config.aliases')
var specPath = aliases['@spec'] + '/e2e'

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  globals_path: path.join(__dirname, './nightwatch.globals.js'),

  src_folders: [specPath],
  output_folder: 'reports/e2e',
  custom_assertions_path: ['tooling/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
