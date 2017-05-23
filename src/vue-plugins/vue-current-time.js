
// A simple running clock service

// FIXME
// this is custom code that is not currently functional. We're testing different patterns for writing service-style code as utilities, Vue plugins or imported Vue objects.

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
