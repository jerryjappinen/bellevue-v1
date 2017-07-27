import { merge } from 'lodash';

// Actual config files
// import defaultAliases from './config.aliases';
import defaultBase from './config.base';
import defaultStyles from './config.styles';

// Dev overrides
import devBase from './config.dev.base';

// Merge configs with multiple sources
let mergedBase = defaultBase;

if (process.env.NODE_ENV === 'development') {
	mergedBase = merge(mergedBase, devBase);
}

mergedBase.styles = defaultStyles;

// Export base config with aliases, routes and styles added as separate items
export default mergedBase;
