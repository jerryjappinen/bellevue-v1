
import _ from 'lodash';

// Actual config files
import defaultAliases from './config.aliases';
import defaultBase from './config.base';
import defaultRoutes from './config.routes';
import defaultStyles from './config.styles';

// Dev overrides
import devBase from './config.dev.base';
import devRoutes from './config.dev.routes';

// Merge configs with multiple sources
let mergedBase = defaultBase;
let mergedRoutes = defaultRoutes;

if (process.env.NODE_ENV === 'development') {
	mergedBase = _.merge(mergedBase, devBase);
	mergedRoutes = mergedRoutes.concat(devRoutes);
}

// Export base config with aliases, routes and styles added as separate items
export default _.merge(
	{},
	mergedBase,
	{
		aliases: defaultAliases,
		routes: mergedRoutes,
		styles: defaultStyles
	}
);
