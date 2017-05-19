
// A simple running clock service
import Vue from 'vue';
import CurrentTime from '@vendor/CurrentTime';

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
		Vue.prototype.$clock = CurrentTime;

	}
};



// Using the plugin

Vue.use(Plugin);

export default Plugin;
