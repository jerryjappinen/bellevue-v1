
// Axios injected into Vue
// https://github.com/mzabriskie/axios
// https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4
import Vue from 'vue';
import Axios from 'axios';
Vue.prototype.$http = Axios;
export default Axios;
