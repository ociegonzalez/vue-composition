import type { IUser } from '@/modules/auth/interfaces/user.interface.ts'

export interface IProduct {
  id: string
  title: string
  price: number
  description: string
  slug: string
  stock: number
  sizes: string[]
  gender: string
  tags: string[]
  images: string[]
  user: IUser
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  XL = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}
