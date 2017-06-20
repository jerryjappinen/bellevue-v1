
import _ from 'lodash';

export default {

	trimWhitespace: function (string) {
		return _.trim(string).replace(/\s+/g, ' ');
	},

	getDomainName: function (string) {
		var domain = _.trim(string);

		// Find & remove protocol (http, ftp, etc.) and get domain
		if (domain.indexOf('://') > -1) {
			domain = domain.split('/')[2];
		} else {
			domain = domain.split('/')[0];
		}

		// Find & remove query parameters
		domain = domain.split('?')[0];

		// Find & remove port number
		domain = domain.split(':')[0];

		return domain;
	}

};
