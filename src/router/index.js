import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PizzaList from '../views/PizzaList.vue'
import CreatePoll from '../views/CreatePoll.vue'
import Poll from '../views/Poll.vue'
import OptionVoters from '../views/OptionVoters.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/products',
  name: 'PizzaList',
  component: PizzaList
},
{
  path: '/create-poll',
  name: 'CreatePoll',
  component: CreatePoll
},
{
  path: '/poll',
  name: 'Poll',
  component: Poll
},
{
  path: '/poll/:pollId/option/:optionValue',
  name: 'OptionVoters',
  component: OptionVoters
  // },
  // {
  //   path: '/poll', redirect: to => {
  //     // console.log(to.query)
  //     // const liffState = to.query['liff.state']
  //     // if (liffState) {
  //     //   const poll = (new URLSearchParams(liffState)).get('poll')
  //     //   console.log(poll)
  //     //   window.location.replace(window.location.origin + '/poll/' + poll)
  //     //   //return '/poll/' + poll
  //     // }
  //     // If url is /poll?poll=xyz then redirect to /poll/xyz (for LINE Login on web)
  //     if (to.query.poll) {
  //       return '/poll/' + to.query.poll
  //     }
  //     return '/'
  //   }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router