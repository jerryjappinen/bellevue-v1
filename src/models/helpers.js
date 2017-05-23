
// Allow initialising a model without having to know Vue's syntax for passing property values
function init (Model, propsData) {
	return new Model({
		propsData
	});
};

export {
	init
};

export default {
	init
};
