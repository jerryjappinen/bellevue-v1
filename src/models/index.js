// All models
import Account from './Account';
import Comment from './Comment';
import Post from './Post';
import Remote from './Remote';
import User from './User';

// Helpers
// Allow initialising a model without having to know Vue's syntax for passing property values
const init = function (Model, data) {
	return new Model({
		propsData: data
	});
};

// Exports

export {
	init,
	Account,
	Comment,
	Post,
	Remote,
	User
};

export default {
	init,
	Account,
	Comment,
	Post,
	Remote,
	User
};
