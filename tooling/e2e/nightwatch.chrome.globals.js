var _ = require('lodash')
var chromedriver = require('chromedriver')

var defaults = require('./nightwatch.globals.js')

module.exports = _.merge(defaults, {

  before: function (done) {
    chromedriver.start()
    done()
  },

  after: function (done) {
    chromedriver.stop()
    done()
  }

})
