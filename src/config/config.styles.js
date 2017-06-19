
import _ from 'lodash';

// Get SCSS constants
// eslint-disable-next-line import/no-webpack-loader-syntax
import scssConstants from '!sass-to-js-var-loader!@styles/definitions/constants';

// eslint-disable-next-line import/no-webpack-loader-syntax
import scssPalette from '!sass-to-js-var-loader!@styles/definitions/palette';

const styles = _.merge(scssConstants, scssPalette);

// Convert some values to numbers
var parsedStyles = {};
for (var key in styles) {
	var potentialUnit = styles[key].substr(-2);
	if (_.includes(['ms', 'px'], potentialUnit)) {
		parsedStyles[key] = parseInt(styles[key]);
	} else {
		parsedStyles[key] = styles[key];
	}
}

export default parsedStyles;
