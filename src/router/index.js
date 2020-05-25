import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/travel/:Pid',
    name: 'Travel',
    component: () => import('../views/Travel.vue')
  },
  {
    path: '/total',
    name: 'Total',
    component: () => import('../views/Total.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
