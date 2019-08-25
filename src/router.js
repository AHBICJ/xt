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
      path: '/classroom',
      name: 'classroom', 
      meta: { requiresAuth: true },
      component: () => import('./views/classroom'),
      children: [
        {
          path:"",
          name:"index",
          component: () => import('./views/classroom/Classroom.vue'),
        }
        ,
        {
          path: ':id/intro',
          name:'intro',
          alias: ':id',
          component: ()=>import('./views/classroom/Intro.vue'),
        },
        {
          path: ':id/member',
          name: 'member',
          component: () => import('./views/classroom/Member.vue')
        },
        {
          path: ':id/task',
          name: 'taskindex',
          component: () => import('./views/classroom/task'),
          children:[
            {
              path: "",
              name:"alltask",
              component: () => import('./views/classroom/task/TaskAll.vue')
            },
            {
            path: ':taskid',
            name: 'taskdetail',
            component: () => import('./views/classroom/task/taskDetail')
          }
          ]
        },
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue')
    }
  ]
})
