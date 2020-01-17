import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Ponuda from '../views/Ponuda.vue'
import Narudzbe from '../views/Narudzbe.vue'
import DodajProizvod from '../proizvodi/DodajProizvod.vue'
import Kosarica from '../shop/Kosarica.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ponuda',
    name: 'ponuda',
    component: Ponuda
  },
  {
    path: '/dodaj-proizvod',
    name: 'dodaj-proizvod',
    component: DodajProizvod
  },
  {
    path: '/kosarica',
    name: 'kosarica',
    component: Kosarica
  },
  {
    path: '/narudzbe',
    name: 'narudzbe',
    component: Narudzbe
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
