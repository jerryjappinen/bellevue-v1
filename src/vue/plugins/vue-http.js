
// Axios is a standalone HTTP library. We inject it into Vue here so it works similarly to purpose-built Vue plugins.
// https://github.com/mzabriskie/axios
// https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4
import Vue from 'vue';
import Axios from 'axios';
Vue.prototype.$http = Axios;
export default Axios;
