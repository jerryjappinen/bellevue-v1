
// Global state management for complex use cases
// https://vuex.vuejs.org/en/
// NOTE: This file is only initializes the plugin, the state management logic is under store/

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Fetch the state, actions ang getters etc. from under store/
import {
	store as stateManagementLogic
} from '@store/';

export default new Vuex.Store(stateManagementLogic);
