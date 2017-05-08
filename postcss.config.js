// https://github.com/michael-ciniawsky/postcss-load-config
// https://github.com/postcss/postcss-scss/issues/49

module.exports = {
  'syntax': require('postcss-scss'),
  // 'syntax': 'postcss-scss',
  'parser': 'scss',
  'plugins': {
    // to edit target browsers: use 'browserlist' field in package.json
    'autoprefixer': {}
  }
}
