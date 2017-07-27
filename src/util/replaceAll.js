import escapeRegExpString from './escapeRegExpString';

export default function (string, search, replacement) {

	if (search && (typeof search === 'string' || typeof search === 'number')) {
		search = '' + search;

		if (!replacement) {
			replacement = '';
		}

		return string.replace(new RegExp(escapeRegExpString(search), 'g'), replacement);
	}

	return string;
}
