import { debounce } from 'lodash';
import Vue from 'vue';

export default new Vue({

	data: function () {
		return {
			// onScrollRegistration: null,
			// onResizeRegistration: null,
			width: 0,
			height: 0,
			scrollX: 0,
			scrollY: 0
		};
	},

	computed: {

		isScrolled: function () {
			return this.scrollY > 0 ? true : false;
		},

		isScrolledX: function () {
			return this.scrollX > 0 ? true : false;
		},

		isLandscape: function () {
			return this.width > this.height ? true : false;
		},

		isPortrait: function () {
			return !this.isLandscape;
		}

	},

	methods: {



		// Helpers

		getScrollX: function () {
			return (window.pageXOffset || window.document.scrollLeft || 0) - (window.document.clientLeft || 0);
		},

		getScrollY: function () {
			return (window.pageYOffset || window.document.scrollTop || 0) - (window.document.clientTop || 0);
		},

		getHeight: function () {
			return window.innerHeight;
		},

		getWidth: function () {
			return window.innerWidth;
		},

		getRealDimensions: function () {
			return [this.getWidth(), this.getHeight()];
		},



		// Throttled updaters

		updateDimensions: function () {
			this.width = this.getWidth();
			this.height = this.getHeight();
		},

		updateScrollValues: function () {
			this.scrollX = this.getScrollX();
			this.scrollY = this.getScrollY();
		},

		onResize: debounce(function () {
			this.updateDimensions();
		}, 10, {
			leading: true
		}),

		onScroll: debounce(function () {
			this.updateScrollValues();
		}, 10, {
			leading: true
		})

	},

	created: function () {
		this.updateDimensions();
		this.updateScrollValues();

		// Bind listeners
		// FIXME: can/should I use this.$on (i.e. Vue's vustom events, NOT a wrapper for addEventListener)?
		window.addEventListener('resize', this.onResize);
		window.addEventListener('scroll', this.onScroll);

	},

	beforeDestroy: function () {

		// Remove listeners
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('scroll', this.onScroll);

	}

});
