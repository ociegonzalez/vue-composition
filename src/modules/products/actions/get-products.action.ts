import tesloApi from '@/api/tesloApi.ts'
import type { IProduct } from '@/modules/products/interfaces/products.interface.ts'
import { getProductImageAction } from '@/modules/products/actions/get-product-image.action.ts'

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<IProduct[]>(
      `/products?limit=${limit}&offset=${(page-1) * limit}`,
    )

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }))
  } catch (e) {
    throw new Error('Error getting products')
  }
}
