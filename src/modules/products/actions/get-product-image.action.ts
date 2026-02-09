export const getProductImageAction = (imageName: string): string => {

  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`
  //   http://localhost:3000/api/files/product/7654399-00-A_1.jpg
}
