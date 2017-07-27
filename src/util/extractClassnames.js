// Pick the keys of a classname hash whose values are truthy
export default function (stateHash) {
	var classes = [];
	for (var key in stateHash) {
		if (stateHash[key]) {
			classes.push(key);
		}
	}
	return classes;
}
