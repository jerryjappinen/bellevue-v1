
// Component-specific meta tags
// https://github.com/declandewet/vue-meta
import Vue from 'vue';
import VueMeta from 'vue-meta';

// Import route components for vue-router
import customConfig from '@config';

Vue.use(VueMeta, customConfig.metaConfig);

export default VueMeta;
