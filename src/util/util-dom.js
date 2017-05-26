
import _ from 'lodash';
import events from './util-events';

export default {

	clearSelection: function () {
		if (window.document.selection && window.document.selection.empty) {
			window.document.selection.empty();
		} else if (window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
		}
	},



	// Determine if a link element should be considered external or internal
	linkIsExternal: function (element) {
		if (
			element.href &&                             // Is link
			(element.hostname !== location.hostname) && // Is external
			!events.eventHasMetaKey(event) &&      // Not using meta key
			(!element.target || element.target === '') &&    // No target specified
			(element.protocol.substr(0, 4) === 'http')  // Is an http(s) link
		) {
			return true;
		}
		return false;
	},



	// Pick the keys of a classname hash whose values are truthy
	extractClassnames: function (stateHash) {
		var classes = [];
		for (var key in stateHash) {
			if (stateHash[key]) {
				classes.push(key);
			}
		}
		return classes;
	},

	// Generate HTML/CSS class names based on a set of state, with prefixes and negatives added
	composeClassnames: function (stateHash, prefixPositive, prefixNegative) {
		var classes = [];

		// Custom prefixes
		if (prefixPositive) {

			// Only positive prefix was passed, using it as the base for negative as well
			if (!prefixNegative) {
				prefixNegative = prefixPositive + '-not';
			}

		// Default prefixes
		} else {
			prefixPositive = 'is';
			prefixPositive = 'not';
		}

		// State classes
		for (var key in stateHash) {
			var className;

			// String/number value goes into the class name
			if (_.isString(stateHash[key]) || _.isNumber(stateHash[key])) {
				className = key + '-' + stateHash[key];

			// Otherwise we use boolean classnames
			} else {

				// Prevent duplicating prefixes if they're passed in the keys
				if (key.substr(0, prefixPositive.length) === prefixPositive) {
					className = key.substr(prefixPositive.length);

				} else if (key.substr(0, prefixPositive.length) === prefixPositive) {
					className = key.substr(prefixPositive.length);

				// Nothing to sanitize
				} else {
					className = key;
				}

			}

			// Compose prefix + value
			// Turn into kebab-case
			// Push into results array
			classes.push(_.kebabCase((stateHash[key] ? prefixPositive : prefixNegative) + '-' + className));

		}

		return classes;
	}


};
