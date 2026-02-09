import tesloApi from '@/api/tesloApi.ts'
import type { IProduct } from '@/modules/products/interfaces/products.interface.ts'

export const createUpdateProductAction = async (product: Partial<IProduct>) => {
  const productId = product.id

  const newImages = await uploadImages(product.images ?? [])
  product.images = newImages

  product = cleanProductForCreateUpdateProductAction(product)

  if (productId && productId !== '') {
    return await updateProduct(productId, product)
  }

  return await createProduct(product)
}
const cleanProductForCreateUpdateProductAction = (product: Partial<IProduct>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop()
        return imageName ? image : ''
      }
      return image
    }) ?? []

  delete product.id
  delete product.user

  product.images = images

  return product
}

const updateProduct = async (productId: string, product: Partial<IProduct>) => {
  try {
    const { data } = await tesloApi.patch<IProduct>(`/products/${productId}`, product)
    console.log('Updated product')
    return data
  } catch (error) {
    throw new Error('No se pudo actualizar el producto')
  }
}

const createProduct = async (product: Partial<IProduct>) => {
  try {
    const { data } = await tesloApi.post<IProduct>(`/products`, product)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo actualizar el producto')
  }
}

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[]
  const currentImages = images.filter((image) => typeof image === 'string') as string[]

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData)

      return data.secureUrl
    } catch (error) {
      console.log(error)
      throw new Error('Error uploading image')
    }
  })

  const uploadedImages = await Promise.all(uploadPromises)

  return [...currentImages, ...uploadedImages]
}

export default createUpdateProductAction
