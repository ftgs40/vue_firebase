import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HomePage from './pages/home.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
