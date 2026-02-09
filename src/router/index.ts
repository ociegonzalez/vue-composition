import { createRouter, createWebHistory } from 'vue-router'
import { autRoutes } from '@/modules/auth/routes/indext.ts'
import { adminRoutes } from '@/modules/admin/routes'
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard.ts'
import isAdminGuard from '@/modules/auth/guards/is-admin.guard.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      // beforeEnter: [isAuthenticatedGuard],
      component: () => import('../modules/shop/layout/ShopLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../modules/shop/views/HomeView.vue'),
        },
      ],
    },
    autRoutes,
    adminRoutes,
  ],
})

export default router
