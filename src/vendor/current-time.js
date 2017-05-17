
// The service blueprint
export default {
	time: null,

	_timer: null,

	setTime: function () {
		this.time = new Date();
		return this;
	},

	onTimerUpdate: function () {
		window.requestAnimationFrame(this.setTime);
		return this;
	},

	startTimer: function () {
		var clock = this;

		// Setup
		clock.clearInterval();

		// Update immediately for the first time
		clock.onTimerUpdate();

		// Start interval
		clock._timer = setInterval(function () {
			clock.onTimerUpdate();
		}, 1000);

		return clock;
	},

	clearInterval: function () {

		if (this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}

		return this;
	}

};

// Expose as this.$clock in components and other Vue objects
// export default new ClockService(options.updateInterval);
