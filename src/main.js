// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTailwind from 'vue-tailwind'
import VuePrism from "vue-prism";
import "prismjs/themes/prism.css";
import "./assets/styles/index.css";
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(VueTailwind)
Vue.use(BootstrapVueIcons)
Vue.use(VuePrism)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {},
  router,
  components: { App },
  template: '<App/>'
})
