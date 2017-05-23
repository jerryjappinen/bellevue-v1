
import _ from 'lodash';
import Vue from 'vue';
import throttle from 'raf';

export default new Vue({

	data: function () {
		return {
			component: null,
			inPlaceTarget: null,
			inPlaceTargetBox: null,
			_interval: null
		};
	},

	// computed: {},

	methods: {

		clearInterval: function () {
			if (this._interval) {
				throttle.cancel(this._interval);
			}
		},

		getBoundingBoxProperties: function (clientRect) {
			var keys = ['left', 'top', 'right', 'bottom', 'width', 'height'];
			var properties = {};
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = clientRect[key];
				properties[key] = typeof value === 'number' ? value : null;
			}
			return properties;
		},

		updateInPlaceTargetBox: function () {

			// This gives us width, height, top, bottom, left, right
			if (this.inPlaceTarget) {

				var newProperties = this.getBoundingBoxProperties(this.inPlaceTarget.getBoundingClientRect());

				// First round
				if (!this.inPlaceTargetBox) {
					this.inPlaceTargetBox = newProperties;

				// Update only what's changed
				} else {
					this.inPlaceTargetBox = _.merge({}, this.inPlaceTargetBox, newProperties);
				}

			// Clean up
			} else {
				this.inPlaceTargetBox = null;
			}

		},

		open: function (component, inPlaceTarget) {

			if (component) {
				component = _.kebabCase(component);

				// Proper in-place target given
				if (inPlaceTarget) {

					// Get target and update dimensions
					this.inPlaceTarget = inPlaceTarget;
					this.updateInPlaceTargetBox();

					// Keep target box updated
					// FLAG: brute force approach...
					if (this.inPlaceTargetBox) {
						this.clearInterval();
						this._interval = throttle(this.updateInPlaceTargetBox);
					}

				// Ensure there's no in-place target left over
				} else {
					this.inPlaceTarget = null;
					this.inPlaceTargetBox = null;
					this.clearInterval();
				}

				// Set the given component
				this.component = component;

			}

		},

		close: function () {

			this.clearInterval();
			this.component = null;
			this.inPlaceTarget = null;
			this.inPlaceTargetBox = null;

		}

	}

});
