import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store.ts'
import { EAuthStatus } from '@/modules/auth/interfaces'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {

  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  authStore.autStatus === EAuthStatus.UnAuthenticated ? next({ name: 'login' }) : next()
};

export default isAuthenticatedGuard;
