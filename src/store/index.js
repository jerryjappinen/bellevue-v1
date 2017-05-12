
// FIXME
//
// Obviously this should be split into smaller modules and multiple files



// State (similar to `data` in Vue)
export const state = {
	counter: 1
};

// Dynamic getters (similar to `computed` in Vue)
export const getters = {

	canDecrementCounter: function (state, getters) {
		return (state.counter > 1) ? true : false;
	},

	counterSquared: function (state, getters) {
		return Math.pow(state.counter, 2);
	}

};

// Mutations (similar to atomic methods under `methods` in Vue)
// Use these in actions with `context.commit('increment')`
export const mutations = {

	incrementCounter: function (state) {
		state.counter++;
	},

	decrementCounter: function (state) {
		state.counter--;
	}

};

// Actions (similar to helpers under `methods` in Vue)
// Use these in components with `this.$store.dispatch('increment')`
// Context includes actions and getters
export const actions = {

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
export const modules = {};

// Export all parts as one object
export const store = {
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
	modules: modules
};
