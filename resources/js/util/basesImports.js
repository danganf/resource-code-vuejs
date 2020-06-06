window.Vue      = require('vue');
window.eventBus = new Vue();

import Snotify from 'vue-snotify';
import VueSwal from 'vue-swal';
import Vuelidate from 'vuelidate';
import { MixMoney } from '@/mixins/money';
import CMenu from '@components/menu';
import CHeader from '@/layout/header';

import 'vue-snotify/styles/material.css';

Vue.use(Snotify, {toast: {showProgressBar: true, timeout: 3000, position: 'rightTop'}});
Vue.use(VueSwal);
Vue.use(Vuelidate);

Vue.mixin(MixMoney);

Vue.component('CHeader', CHeader);
Vue.component('CMenu', CMenu);
