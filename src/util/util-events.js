
export default {

	setSomeOtherValue: function () {
		console.log(this.someOtherValue);
		this.someOtherValue = 'Bar';
	},

	eventHasMetaKey: function (event) {
		return (event.ctrlKey || event.metaKey || event.shiftKey);
	}

};
