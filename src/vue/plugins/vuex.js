
// State management library
// https://vuex.vuejs.org/en/
// NOTE: This file is only initializes the plugin, the state management logic is under store/

import Vue from 'vue';
import Vuex from 'vuex';

// Fetch the state, actions and getters etc. from under store/
import { store } from '@store';

// Autoload plugin
Vue.use(Vuex);

// Export a new plugin instance
export default new Vuex.Store(store);
