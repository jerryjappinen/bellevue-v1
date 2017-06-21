import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
// const testsContext = require.context('@spec-unit', true, /\.spec$/)
const testsContext = require.context('@spec', true, /^(?!e2e).*\.spec/gm)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.

// /^\.\/(?!main(\.js)?$)(?!.*\.scss$)/
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
