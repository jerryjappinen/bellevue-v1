
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			macosPlatforms: ['macintosh', 'macintel', 'macppc', 'mac68k'],
			windowsPlatforms: ['win32', 'win64', 'windows', 'wince'],
			iosPlatforms: ['iphone', 'ipad', 'ipod']
		};
	},

	computed: {

		os: function () {
			return this.getOsFromNavigator(window.navigator.userAgent, window.navigator.platform);
		}

	},

	methods: {

		// NOTE: platform detection is never 100 % reliable
		getOsFromNavigator: function (userAgent, platform) {
			userAgent = userAgent.toLowerCase();
			platform = platform.toLowerCase();

			if (this.macosPlatforms.indexOf(platform) !== -1) {
				return 'mac';

			} else if (this.iosPlatforms.indexOf(platform) !== -1) {
				return 'ios';

			} else if (this.windowsPlatforms.indexOf(platform) !== -1) {
				return 'windows';

			} else if (new RegExp('Android').test(userAgent)) {
				return 'android';

			} else if (new RegExp('Linux').test(platform)) {
				return 'linux';
			}

			return null;
		}

	}

});
