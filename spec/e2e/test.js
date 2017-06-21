// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	'default e2e tests': function (browser) {

		// automatically uses dev Server port from `/webpack/env/index.js`
		// default: http://localhost:8080
		// see nightwatch.conf.js
		const devServer = browser.globals.devServerURL;

		browser
		.url(devServer)
		.waitForElementVisible('.view-app', 5000)
		.assert.elementPresent('.view-page-home')
		.assert.containsText('h1', 'Hello world!')
		.end();

	}
};
