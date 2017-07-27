// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
export default function (string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
