
// A simple running clock service
import Vue from 'vue';
import CurrentTime from '@vendor/current-time';

// Register plugin to Vue
const Plugin = {
	install: function (Vue, options) {

		Vue.mixin({
			data: function () {
				return {
					$time: null
				};
			}
		});

		// Expose as this.$clock in components and other Vue objects
		Vue.prototype.$time = (new CurrentTime(options.updateInterval)).startTimer();

	}
};



// Using the plugin

Vue.use(Plugin, {
	updateInterval: 1000
});

export default Plugin;
