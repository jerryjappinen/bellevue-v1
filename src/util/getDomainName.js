import { trim } from 'lodash';

export default function (string) {
	var domain = trim(string);

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
