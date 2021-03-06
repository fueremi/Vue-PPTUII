import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeUser from '../views/User/Home.vue'
import Pemeriksaan from '../views/User/Pemeriksaan.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Service from '../views/Service.vue'
import Admin from '../views/Admin/Home.vue'
import HomePsikolog from '@/views/Psikolog/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeUser
  },
  {
    path: '/services',
    name: 'Service',
    component: Service
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
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/pemeriksaan/:jenis',
    name: 'Pemeriksaan',
    component: Pemeriksaan
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/psikolog',
    name: 'Psikolog',
    component: HomePsikolog
  }
]

const router = new VueRouter({
  routes
})

export default router
