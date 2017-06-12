
import Account from './Account';
import Role from './Role';



// Helpers

// Allow initialising a model without having to know Vue's syntax for passing property values
const init = function (Model, propsData) {
	return new Model({
		propsData
	});
};



// Exports

export {
	init,
	Account,
	Role
};

export default {
	init,
	Account,
	Role
};
