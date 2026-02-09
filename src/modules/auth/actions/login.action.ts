import tesloApi from '@/api/tesloApi.ts'
import type { IAuthResponseInterface, IUser } from '@/modules/auth/interfaces'
import { isAxiosError } from 'axios'

interface ILoginError {
  ok: false
  message: string
}

interface ILoginSuccess {
  ok: true
  user: IUser
  token: string
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<ILoginError | ILoginSuccess> => {
  try {
    const { data } = await tesloApi.post<IAuthResponseInterface>('/auth/login', { email, password })

    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 401)
      return { ok: false, message: 'Usuario o password incorrectos' }

    console.log(e)
    throw new Error('No se pudo realizar la peticion')
  }
}
