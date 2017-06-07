
import en from './en';
import es from './es';

export default {

	messages: {
		en,
		es
	},

	// NOTE: browser will handle the final part of localisation, e.g. month names etc.
	// See details: http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor
	dateTimeFormats: {
		'en': {
			short: {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			},
			long: {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				weekday: 'short',
				hour: 'numeric',
				minute: 'numeric'
			}
		},
		'es': {
			short: {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			},
			long: {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				weekday: 'short',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			}
		}
	},

	// See details: https://kazupon.github.io/vue-i18n/en/number.html
	numberFormats: {
		'en': {
			currency: {
				style: 'currency',
				currency: 'USD'
			}
		},
		'es': {
			currency: {
				style: 'currency',
				currency: 'USD',
				currencyDisplay: 'symbol'
			}
		}
	}

};
