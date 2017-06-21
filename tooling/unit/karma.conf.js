// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../tooling/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: [
      // 'Chrome',
      'PhantomJS'
    ],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage', 'html'],
    files: [

      // Required to suppress issue with ES6 Promise polyfill missing in PhantomJS
      '../../node_modules/babel-polyfill/dist/polyfill.js',

      // Required to suppress weird issues when constructing new instances of objects
      '../../node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',

      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: '../../reports',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    // the default configuration
    htmlReporter: {
      outputDir: 'reports', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: true, // name files instead of creating sub-directories
      pageTitle: 'Unit test report', // page title for reports; browser info by default
      urlFriendlyName: true, // simply replaces spaces with _ for files/dirs
      reportName: 'unit', // report summary filename; browser info by default

      // experimental
      preserveDescribeNesting: false, // folded suites stay folded
      foldAll: false // reports start folded (only with preserveDescribeNesting)
    }

  })
}
