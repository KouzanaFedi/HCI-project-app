import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/skillMeter',
    name: 'skillMeter',
    component: () => import('../views/SkillMeter.vue')
  },
  {
    path: '/minesweeper',
    name: 'minesweeper',
    component: () => import('../views/Minesweeper.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router