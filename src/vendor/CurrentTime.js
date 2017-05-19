
/**
 * Service blueprint and exported object for the timer service.
 *
 * @name: CurrentTime
 * @todo: This should be a constructor instead of just a blueprint.
 */
var CurrentTime = {

	/**
	 * Current time
	 *
	 * @name CurrentTime#time
	 * @todo: Is this confusingly named? Maybe `currentTime` could be better.
	 */
	time: null,

	/**
	 * Timer interval object. Available after `startTimer` has been called. Can be removed with `stopTimer`.
	 *
	 * @name CurrentTime#_timer
	 */
	_timer: null,

	/**
	 * Update the current time with a new Date object
	 */
	setCurrentTime: function () {
		this.time = new Date();
		return this;
	},

	/**
	 * Clear `time` and remove any reference to current time. If timer is running, it will still update the current time in the next update.
	 */
	clearCurrentTime: function () {
		this.time = null;
		return this;
	},

	/**
	 * Throttled callback for each update.
	 */
	onTimerUpdate: function () {
		window.requestAnimationFrame(this.setCurrentTime);
		return this;
	},

	/**
	 * Start timer and regular updates. Timer will run until `stopTimer` is called. If timer is already running, it will be stopped and then restarted.
	 */
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

	/**
	 * Stop updating the current time. `time` will keep the last time.
	 */
	stopTimer: function () {

		if (this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}

		return this;
	}

};

export default CurrentTime;
