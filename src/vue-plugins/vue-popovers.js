
// FIXME
// this is custom code that is not currently functional. We're testing different patterns for writing service-style code as utilities, Vue plugins or imported Vue objects.

import Vue from 'vue';
import throttle from 'raf';

var install = function (Vue) {

	// This will be exposed
	// Methods added below

	var $popover = {
		component: null,
		inPlaceTarget: null,
		inPlaceTargetBox: null
	};



	// Helper methods

	var interval = null;

	var clearInterval = function () {
		if (interval) {
			throttle.cancel(interval);
		}
	};

	var updateInPlaceTargetBox = function () {

		// This gives us width, height, top, bottom, left, right
		if ($popover.inPlaceTarget) {

			var newProperties = $popover.inPlaceTarget.getBoundingClientRect();

			// First round
			if (!$popover.inPlaceTargetBox) {
				$popover.inPlaceTargetBox = newProperties;
			} else {

				// Update only what's changed
				var keys = ['left', 'top', 'right', 'bottom', 'x', 'y', 'width', 'height'];
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if ($popover.inPlaceTargetBox[key] !== newProperties[key]) {

						// FIXME: am I doing multiple updates instead of one?
						$popover.inPlaceTargetBox[key] = newProperties[key];

					}
				}

			}

		// Clean up
		} else {
			$popover.inPlaceTargetBox = null;
		}

	};



	// API methods

	$popover.on = function (eventKey, callback) {
		EventBus.$on('popover:' + eventKey, callback);
	};

	$popover.off = function (eventKey, callback) {
		EventBus.$off('popover:' + eventKey, callback);
	};

	$popover.open = function (component, inPlaceTarget) {

		// Proper in-place target given
		if (inPlaceTarget) {

			// Get target and update dimensions
			$popover.inPlaceTarget = inPlaceTarget;
			updateInPlaceTargetBox();

			// Keep target box updated
			// FLAG: brute force approach...
			if ($popover.inPlaceTargetBox) {
				clearInterval();
				interval = throttle(updateInPlaceTargetBox);
			}

		// Ensure there's no in-place target left over
		} else {
			$popover.inPlaceTarget = null;
			$popover.inPlaceTargetBox = null;
			clearInterval();
		}

		// Set the given component
		$popover.component = component;

		// Share the news across the app
		EventBus.$emit('popover:open', {
			component: $popover.component,
			inPlaceTarget: $popover.inPlaceTarget,
			inPlaceTargetBox: $popover.inPlaceTargetBox
		});

	};

	$popover.close = function () {

		clearInterval();
		$popover.component = null;
		$popover.inPlaceTarget = null;
		$popover.inPlaceTargetBox = null;

		// Share the news across the app
		EventBus.$emit('popover:close');
	};



	// Export

	var EventBus = new Vue();

	// FIXME: this will go into the popover component
	var handleClickOutside = function (event) {
		console.log('popover click', event);
	};
	EventBus.$on('click', handleClickOutside);

	// Vue.prototype.$popover = $popover;

	Vue.mixin({
		beforeCreate: function () {
			if (!this.$popover) {
				this.$popover = $popover;
			} else if (this.parent && this.parent.$popover) {
				this.$popover = this.parent.$popover;
			}
		}
	});

};

var Plugin = {
	install: install
};

Vue.use(Plugin);
