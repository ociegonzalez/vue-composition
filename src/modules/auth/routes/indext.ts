import type { RouteRecordRaw } from 'vue-router'
import isNotAuthenticatedGuard from '@/modules/auth/guards/is-not-authenticated.guard.ts'



export const autRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  redirect: { name: 'login' },
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/pages/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/pages/RegisterView.vue'),
    },
  ],
}
