import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/Index.vue'
import { darkTheme } from 'naive-ui'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/views/Report.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/admin/User.vue')
      },
      {
        name: 'school',
        path: 'school',
        component: () => import('@/views/admin/School.vue')
      },
      {
        name: 'security',
        path: 'security',
        component: () => import('@/views/admin/Security.vue')
      },
      {
        name: 'epidemic',
        path: 'epidemic',
        component: () => import('@/views/admin/Epidemic.vue')
      },
      {
        name: 'school-report',
        path: 'school-report',
        component: () => import('@/views/admin/SchoolReport.vue')
      },
      {
        name: 'user-report',
        path: 'user-report',
        component: () => import('@/views/admin/UserReport.vue')
      },
      {
        name: 'info',
        path: 'info',
        component: () => import('@/views/admin/Info.vue')
      }
    ]

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
