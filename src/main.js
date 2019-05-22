// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

// import firebase from 'firebase/app'
// import 'firebase/database'

import App from './App'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.use(Uimini)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
  }
})
