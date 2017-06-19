
import _ from 'lodash';

// Actual config files
import aliases from './config.aliases';
import base from './config.base';
import routes from './config.routes';
import styles from './config.styles';

// Export base config, with aliases and routes added
export default _.merge({}, base, { aliases, routes, styles });
