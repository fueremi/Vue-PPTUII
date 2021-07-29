import Vue from 'vue'
import VueRouter from 'vue-router'
import Profil from '@/views/Profil'
import Layanan from '@/views/Layanan'
import Kontak from '@/views/Kontak'
import Login from '@/views/Login'
import Register from '@/views/Register' 
import HomePasien from '@/views/Pasien/Home'
import HomeAdmin from '@/views/Admin/Home'
import HomePsikolog from '@/views/Psikolog/Home'
import Dokumen from '@/views/Psikolog/Dokumen'
import Pemeriksaan from '../views/Pasien/Pemeriksaan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/layanan',
    name: 'Layanan',
    component: Layanan
  },
  {
    path: '/kontak',
    name: 'Kontak',
    component: Kontak
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
    path: '/pasien/:jenis?',
    name: 'HomePasien',
    component: HomePasien
  },
  {
    path: '/admin/',
    name: 'HomeAdmin',
    component: HomeAdmin
  },
  {
    path: '/psikolog',
    name: 'HomePsikolog',
    component: HomePsikolog
  },
  {
    path: '/psikolog/dokumen/:id',
    name: 'Dokumen',
    component: Dokumen
  }
  // {
  //   path: '/services',
  //   name: 'Service',
  //   component: Service
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },

  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register
  // },
  // {
  //   path: '/pemeriksaan/:jenis',
  //   name: 'Pemeriksaan',
  //   component: Pemeriksaan
  // },
  // {
  //   path: '/admin',
  //   name: 'HomeAdmin',
  //   component: HomeAdmin
  // },
  // {
  //   path: '/psikolog',
  //   name: 'HomePsikolog',
  //   component: HomePsikolog
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
