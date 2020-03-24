import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PizzaList from '../views/PizzaList.vue'
import Poll from '../views/Poll.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/create-poll',
    name: 'CreatePoll',
    component: () => import(/* webpackChunkName: "create-poll" */ '../views/CreatePoll.vue')
  },
  {
    path: '/products',
    name: 'PizzaList',
    component: PizzaList
  },
  {
    path: '/poll',
    name: 'Poll',
    component: Poll
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
