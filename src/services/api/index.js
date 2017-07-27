import { merge } from 'lodash';
import Vue from 'vue';

import api from './api';
import apiAuth from './apiAuth';
import apiComments from './apiComments';
import apiPosts from './apiPosts';
import apiUsers from './apiUsers';

export default new Vue(merge(
	api,
	apiAuth,
	apiComments,
	apiPosts,
	apiUsers
));
