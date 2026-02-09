import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { EAuthStatus, type IUser } from '@/modules/auth/interfaces'
import { checkStautsAction, loginAction, registerAction } from '@/modules/auth/actions'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const autStatus = ref<EAuthStatus>(EAuthStatus.Checking)
  const user = ref<IUser | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password)

      if (!loginResp.ok) {
        logout()
        return false
      }

      user.value = loginResp!.user
      token.value = loginResp!.token
      autStatus.value = EAuthStatus.Authenticated

      return true
    } catch (e) {
      console.log(e)
      return logout()
    }
  }

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password)

      if (!registerResponse.ok) {
        logout()
        return {
          ok: false,
          message: registerResponse.message,
        }
      }

      user.value = registerResponse!.user
      token.value = registerResponse!.token
      autStatus.value = EAuthStatus.Authenticated

      return {
        ok: true,
        message: '',
      }
    } catch (e) {
      console.log(e)
      return logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')

    autStatus.value = EAuthStatus.UnAuthenticated
    user.value = undefined
    token.value = ''
    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const checkStatusResponse = await checkStautsAction()

      if (!checkStatusResponse.ok) {
        logout()
        return false
      }

      user.value = checkStatusResponse!.user
      token.value = checkStatusResponse!.token
      autStatus.value = EAuthStatus.Authenticated

      return true
    } catch (e) {
      console.log(e)
      return logout()
    }
  }

  return {
    user,
    token,
    autStatus,

    //?Getters
    isChecking: computed(() => autStatus.value === EAuthStatus.Checking),
    isAuthenticated: computed(() => autStatus.value === EAuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    //*Acciones
    login,
    logout,
    register,
    checkAuthStatus,
  }
})
