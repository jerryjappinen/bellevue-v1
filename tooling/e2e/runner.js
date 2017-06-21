// 1. start the dev server using production config
process.env.NODE_ENV = 'testing'
var server = require('../../tooling/dev-server.js')

// Select which driver to use based on environment variable passed
var useSelenium = false
if (process.env.DRIVER) {
  var param = ('' + process.env.DRIVER).toLowerCase()
  if (param === 'selenium') {
    useSelenium = true
  } else if (param !== 'chrome') {
    throw Error('Unknown driver requested. Supported drivers are "Selenium" and "Chrome".')
  }
}

// Drivers have different config files
var testConfigFilePath = 'nightwatch.chrome.conf.js'
if (useSelenium) {
  testConfigFilePath = 'nightwatch.conf.js'
}

server.ready.then(() => {
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in tooling/e2e/nightwatch.conf.js under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = process.argv.slice(2)
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'tooling/e2e/' + testConfigFilePath])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  var spawn = require('cross-spawn')
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
})
