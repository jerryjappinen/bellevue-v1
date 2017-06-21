var path = require('path')
var HtmlReporter = require('nightwatch-html-reporter')

var reportsDirectory = path.join(__dirname, '../../reports')

var reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: reportsDirectory,
  reportFilename: 'e2e.html',
  relativeScreenshots: true,

  // https://github.com/jls/nightwatch-html-reporter/tree/master/lib/themes
  themeName: 'outlook'
})

module.exports = {
  reporter: reporter.fn
}
