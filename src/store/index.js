import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



// FIXME
//
// Obviously this should be split into smaller modules

// State (like `data`)
const state = {
	counter: 1
};

// Dynamic getters (like `computed`)
const getters = {

	canDecrementCounter: function (state, getters) {
		return (state.counter > 1) ? true : false;
	},

	counterSquared: function (state, getters) {
		return Math.pow(state.counter, 2);
	}

};

// Mutations (like atomic methods under `methods`)
// Use these in actions with `context.commit('increment')`
const mutations = {

	incrementCounter: function (state) {
		state.counter++;
	},

	decrementCounter: function (state) {
		state.counter--;
	}

};

// Actions (like helpers under `methods`)
// Use these in components with `this.$store.dispatch('increment')`
// Context includes actions and getters
const actions = {

	increment: function (context) {
		context.commit('incrementCounter');
	},

	decrement: function (context) {
		if (context.getters.canDecrementCounter) {
			context.commit('decrementCounter');
		}
	},

	// Increment counter
	incrementAsync: function (context) {
		var callback = function () {

			// NOTE: this is the action, not mutation
			context.dispatch('increment');

		};
		setTimeout(callback, 200);
	}

};

// State management split into smaller chunks
const modules = {};

// Set up and export Vuex object
const store = new Vuex.Store({
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
	modules: modules
});
export default store;
