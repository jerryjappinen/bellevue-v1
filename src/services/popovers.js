import { debounce, defer, isNumber, kebabCase, merge } from 'lodash';
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
			inPlaceFlipY: false,
			inPlaceFlipX: false,

			_interval: null
		};
	},

	computed: {

		shouldBeShown: function () {
			return this.component ? true : false;
		},

		targetCoordinates: debounce(function () {
			if (this.inPlaceTargetBox) {

				// Y position
				let y = this.inPlaceTargetBox.top;
				if (!this.inPlaceFlipY) {
					y = y + this.inPlaceTargetBox.height;
				}

				// X position
				let x = this.inPlaceTargetBox.left;
				if (this.inPlaceFlipX) {
					x = x + this.inPlaceTargetBox.width;
				}

				return {
					x: x,
					y: y
				};
			}
			return null;
		}, 1, { leading: true }),

		isInPlace: function () {
			return this.targetCoordinates &&
				isNumber(this.targetCoordinates.x) &&
				isNumber(this.targetCoordinates.y) &&
				viewport.width > this.inPlaceMinViewportWidth &&
				viewport.height > this.inPlaceMinViewportHeight ? true : false;
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
			console.log('update');

			// This gives us width, height, top, bottom, left, right
			if (this.inPlaceTarget) {

				var newProperties = this.getBoundingBoxProperties(this.inPlaceTarget.getBoundingClientRect());

				// First round
				if (!this.inPlaceTargetBox) {
					this.inPlaceTargetBox = newProperties;

				// Update only what's changed
				} else {
					this.inPlaceTargetBox = merge({}, this.inPlaceTargetBox, newProperties);
				}

			// Clean up
			} else {
				this.inPlaceTargetBox = null;
			}

		},



		// API

		open: function (component, inPlaceTarget, inPlaceFlipX, inPlaceFlipY) {

			if (component) {
				component = kebabCase(component);

				// Proper in-place target given
				if (inPlaceTarget) {

					window.a = inPlaceTarget;

					// Get target and update dimensions
					this.inPlaceTarget = inPlaceTarget;
					this.inPlaceFlipY = inPlaceFlipY ? true : false;
					this.inPlaceFlipX = inPlaceFlipX ? true : false;
					this.updateInPlaceTargetBox();

					// Keep target box updated
					// FLAG: brute force approach...
					if (this.inPlaceTargetBox) {
						this.clearInterval();
						var service = this;
						this._interval = setInterval(function () {
							defer(service.updateInPlaceTargetBox);
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
