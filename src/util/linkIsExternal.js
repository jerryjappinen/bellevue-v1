import eventHasMetaKey from './eventHasMetaKey';

// Determine if a link element should be considered external or internal
export default function (element) {
	if (

		// Is link
		element.href &&

		// Is external
		(element.hostname !== location.hostname) &&

		// Not using meta key
		!eventHasMetaKey(event) &&

		// No target specified
		(!element.target || element.target === '') &&

		// Is an http(s) link
		(element.protocol.substr(0, 4) === 'http')

	) {
		return true;
	}

	return false;

}
