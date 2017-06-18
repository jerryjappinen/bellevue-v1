
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
		};
	},

	computed: {

		// NOTE: platform detection is never 100 % reliable
		os: function () {
			var userAgent = window.navigator.userAgent.toLowerCase();
			var platform = window.navigator.platform.toLowerCase();
			var macosPlatforms = ['macintosh', 'macintel', 'macppc', 'mac68k'];
			var windowsPlatforms = ['win32', 'win64', 'windows', 'wince'];
			var iosPlatforms = ['iphone', 'ipad', 'ipod'];

			if (macosPlatforms.indexOf(platform) !== -1) {
				return 'mac';

			} else if (iosPlatforms.indexOf(platform) !== -1) {
				return 'ios';

			} else if (windowsPlatforms.indexOf(platform) !== -1) {
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
