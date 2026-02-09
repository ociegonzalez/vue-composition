import tesloApi from '@/api/tesloApi.ts'
import type { IProduct } from '@/modules/products/interfaces/products.interface.ts'
import { getProductImageAction } from '@/modules/products/actions/get-product-image.action.ts'

export const getProductByIdAction = async (productId: string): Promise<IProduct> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: '' as any,
      user: {} as any,
    }
  }

  try {
    const { data } = await tesloApi.get<IProduct>(`/products/${productId}`)

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    }
  } catch (e) {
    console.log(e)
    throw new Error(`Errorgetting product by id ${productId}`)
  }
}
