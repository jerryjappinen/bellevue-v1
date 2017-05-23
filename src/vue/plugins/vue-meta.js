
// Component-specific meta tags
// https://github.com/declandewet/vue-meta
import Vue from 'vue';
import VueMeta from 'vue-meta';

// Import route components for vue-router
import config from '@config';

Vue.use(VueMeta, config.metaConfig);

export default VueMeta;
