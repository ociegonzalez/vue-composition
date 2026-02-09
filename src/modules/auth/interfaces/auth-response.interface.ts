import type { IUser } from '@/modules/auth/interfaces/user.interface.ts'

export interface IAuthResponseInterface {
  user: IUser,
  token : string
}
