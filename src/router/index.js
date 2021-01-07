import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Main from '../components/dist/Main.vue'
import List from '../components/dist/List.vue'
import Board from '../components/dist/Board.vue'
import Myself from '../components/dist/Myself.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/main' }, 
  { path: '/welcome', 
    component: Welcome ,
    children:[
      { path: '/main', component:Main },
      { path: '/list', component:List },
      { path: '/board', component:Board },
    ]
  },
  { path: '/myself',component:Myself },
 
]

const router = new VueRouter({
  routes
})

export default router
