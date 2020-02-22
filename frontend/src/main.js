import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

//vuex
import store from './store/index';

// app.js bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//vue-router
import VueRouter from 'vue-router';
import routes from './routes';



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Install vue router
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
