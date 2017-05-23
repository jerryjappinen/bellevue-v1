
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			current: null,
			_timer: null
		};
	},

	computed: {

	},

	methods: {

		// Update the current time with a new Date object
		setCurrentTime: function () {
			this.current = new Date();
			return this;
		},

		// Clear `time` and remove any reference to current time. If timer is running, it will still update the current time in the next update.
		clearCurrentTime: function () {
			this.current = null;
			return this;
		},

		// Throttled callback for each update.
		onTimerUpdate: function () {
			window.requestAnimationFrame(this.setCurrentTime);
			return this;
		},

		// Start timer and regular updates. Timer will run until `stopTimer` is called. If timer is already running, it will be stopped and then restarted.
		startTimer: function () {
			var clock = this;

			// Setup
			clock.stopTimer();

			// Update immediately for the first time
			clock.onTimerUpdate();

			// Start interval
			clock._timer = setInterval(function () {
				clock.onTimerUpdate();
			}, 1000);

			return clock;
		},

		// Stop updating the current time. `time` will keep the last time.
		stopTimer: function () {

			if (this._timer) {
				clearInterval(this._timer);
				this._timer = null;
			}

			return this;
		}

	},

	created: function () {
		this.startTimer();
	}

});
