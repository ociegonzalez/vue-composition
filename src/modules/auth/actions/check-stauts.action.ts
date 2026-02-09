import tesloApi from '@/api/tesloApi.ts'
import type { IAuthResponseInterface, IUser } from '@/modules/auth/interfaces'
import { isAxiosError } from 'axios'

interface ICheckStatusError {
  ok: false
  message: string
}

interface ICheckStatusSuccess {
  ok: true
  user: IUser
  token: string
}
export const checkStautsAction = async (): Promise<ICheckStatusError | ICheckStatusSuccess> => {
  try {
    const localToken = localStorage.getItem('token')

    if (localToken && localToken.length < 10)
      return {
        ok: false,
        message: `Token ${localToken.length} no es correcto`,
      }

    const { data } = await tesloApi.get<IAuthResponseInterface>('auth/check-status')

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
