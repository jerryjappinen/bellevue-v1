
export default {

	eventHasMetaKey: function (event) {
		return (event.ctrlKey || event.metaKey || event.shiftKey);
	}

};
