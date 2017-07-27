// Env service
//
// - OS detection
// - Feature detection
// - Dev/prod handling
// - Access to current remote
import Vue from 'vue';

import { Remote } from '@models';
import config from '@config';

const macosPlatforms = ['macintosh', 'macintel', 'macppc', 'mac68k'];
const windowsPlatforms = ['win32', 'win64', 'windows', 'wince'];
const iosPlatforms = ['iphone', 'ipad', 'ipod'];

export default new Vue({

	data: function () {
		return {

			os: this.getOsFromNavigator(window.navigator.userAgent, window.navigator.platform),

			currentRemote: new Remote({
				propsData: config.remotes[config.currentRemote]
			})

		};
	},

	computed: {

		isDevelopment: function () {
			return config.env === 'development';
		},

		isProduction: function () {
			return !this.isDevelopment;
		}

	},

	methods: {

		// OS checking
		// NOTE: platform detection is never 100 % reliable
		getOsFromNavigator: function (userAgent, platform) {
			userAgent = userAgent.toLowerCase();
			platform = platform.toLowerCase();

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
