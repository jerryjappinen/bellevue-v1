
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			isOnline: false,
			isConnecting: true
		};
	},

	computed: {

		isOffline: function () {
			return !this.isOnline;
		}

	},

	methods: {

		setOffline: function () {
			this.isOnline = false;
			return this;
		},

		setOnline: function () {
			this.isOnline = true;
			return this;
		},

		getOnlineStatus: function () {
			return window.navigator.onLine ? true : false;
		},

		updateOnlineStatus: function () {
			this.isOnline = this.getOnlineStatus();
			return this;
		},

		setListeners: function () {
			window.addEventListener('online', this.updateOnlineStatus);
			window.addEventListener('offline', this.updateOnlineStatus);
		},

		removeListeners: function () {
			window.removeEventListener('online', this.updateOnlineStatus);
			window.removeEventListener('offline', this.updateOnlineStatus);
		}

	},

	created: function () {
		this.updateOnlineStatus();
		this.isConnecting = false;
		this.setListeners();
	},

	beforeDestroy: function () {
		this.removeListeners();
	}

});
