import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



// NOTE: This file is only initializes the plugin, the state management logic is under store/
import {
	store as stateManagementLogic
} from '@store/';

// Set up and export Vuex object
export default new Vuex.Store(stateManagementLogic);
