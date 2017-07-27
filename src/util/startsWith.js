export default function (string, substring) {
	return string.lastIndexOf(substring, 0) === 0 ? true : false;
}
