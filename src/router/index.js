import Vue from 'vue';
import Router from 'vue-router';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import CheckIn from '@/components/CheckIn';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CheckIn',
      component: CheckIn,
    },
  ],
});
