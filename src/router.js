import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')

    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('./views/Article.vue')
    },
    {
      path: '/city/:id',
      name: 'city',
      component: () => import('./views/City.vue')
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    
    {
      path: '/circle',
      name: 'circle',
      component: () => import('./views/circle.vue')  
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import('./views/intro.vue')  
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/list.vue')  
    }
    ,
    {
      path: '/homework/:id',
      name: 'homework',
      component: () => import('./views/homework.vue')  
    },
    {
      path: '/tealook/:id',
      name: 'tealook',
      component: () => import('./views/tealook.vue')
    } ,
    {
      path: '/chooseclass',
      name: 'chooseclass',
      component: () => import('./views/chooseclass.vue')
    }
  ]
})
