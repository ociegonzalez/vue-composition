import tesloApi from '@/api/tesloApi.ts'
import type { IAuthResponseInterface, IUser } from '@/modules/auth/interfaces'

interface IRegisterError {
  ok: false
  message: string
}

interface IRegisterSuccess {
  ok: true
  user: IUser
  token: string
}
export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<IRegisterError | IRegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<IAuthResponseInterface>('/auth/register', {
      fullName,
      email,
      password,
    })

    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (e) {
    console.log(e)

    return  {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }
}
