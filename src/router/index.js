import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Ponuda from '../views/Ponuda.vue'
import Narudzbe from '../views/Narudzbe.vue'
import DodajProizvod from '../proizvodi/DodajProizvod.vue'
import Kosarica from '../shop/Kosarica.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  
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
    path: '/',
    name: 'ponuda',
    component: Ponuda,
    meta:{
      ulogiran:true
    }
  },
  {
    path: '/dodaj-proizvod',
    name: 'dodaj-proizvod',
    component: DodajProizvod,
    meta:{
      adminUlogiran:true
    }
  },
  {
    path: '/kosarica',
    name: 'kosarica',
    component: Kosarica,
    meta:{
      ulogiran:true
    }
  },
  {
    path: '/narudzbe',
    name: 'narudzbe',
    component: Narudzbe,
    meta:{
      adminUlogiran:true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  
  if(to.meta.ulogiran){
    if(store.state.daliJePrijavljeno){
      next()
    }else{
      next('login')
    }

  }else if(to.meta.adminUlogiran){
    if(store.state.daliJePrijavljeno =='admin@admin.com'){
      next()
    }else{
      next(false)
    }

  }else{
    next()
  }
})

export default router
