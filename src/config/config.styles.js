import { includes } from 'lodash';

// Get SCSS constants
// eslint-disable-next-line import/no-webpack-loader-syntax
import styles from '!sass-to-js-var-loader!@styles/definitions/constants';

// Convert some values to numbers
var parsedStyles = {};
for (var key in styles) {
	var potentialUnit = styles[key].substr(-2);
	if (includes(['ms', 'px'], potentialUnit)) {
		parsedStyles[key] = parseInt(styles[key]);
	} else {
		parsedStyles[key] = styles[key];
	}
}

export default parsedStyles;
