import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/auth.store.ts'
import { EAuthStatus } from '@/modules/auth/interfaces'

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  authStore.autStatus === EAuthStatus.Authenticated ? next({ name: 'home' }) : next()
}

export default isNotAuthenticatedGuard
