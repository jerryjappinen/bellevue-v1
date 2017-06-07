
// Handling meta tags and <head> per component
// https://github.com/declandewet/vue-meta
import Vue from 'vue';
import VueMeta from 'vue-meta';

// Import route components for vue-router
import config from '@config';

Vue.use(VueMeta, config.metaInfo);

export default VueMeta;
