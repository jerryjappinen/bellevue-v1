
import _ from 'lodash';
import Vue from 'vue';

import { viewport } from '@services';

export default new Vue({

	data: function () {
		return {
			inPlaceMinViewportWidth: 800,
			inPlaceMinViewportHeight: 400,

			component: null,
			inPlaceTarget: null,
			inPlaceTargetBox: null,
			_interval: null
		};
	},

	computed: {

		shouldBeShown: function () {
			return this.component ? true : false;
		},

		targetCoordinates: _.debounce(function () {
			if (this.inPlaceTargetBox) {
				return {
					x: this.inPlaceTargetBox.left,
					y: this.inPlaceTargetBox.top
				};
			}
			return null;
		}, 1, { leading: true }),

		isInPlace: function () {
			return this.targetCoordinates &&
				_.isNumber(this.targetCoordinates.x) &&
				_.isNumber(this.targetCoordinates.y) &&
				viewport.width > this.inPlaceMinViewportWidth &&
				viewport.height > this.inPlaceMinViewportHeight
					? true
					: false;
		}

	},

	methods: {

		clearInterval: function () {
			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
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



		// API

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
						var vm = this;
						this._interval = setInterval(function () {
							_.debounce(vm.updateInPlaceTargetBox);
						}, 50);
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
