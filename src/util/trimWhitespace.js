import { trim } from 'lodash';

// Condence all whitespace in a string to maximum of one space
export default function (string) {
	return trim(string).replace(/\s+/g, ' ');
}
