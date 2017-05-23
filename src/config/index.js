
import _ from 'lodash';

// Actual config files
import aliases from './config-aliases';
import base from './config-base';
import routes from './config-routes';

export {
	aliases,
	base,
	routes
};

// Export base config, with aliases and routes added
export default _.merge({}, base, { aliases, routes });
