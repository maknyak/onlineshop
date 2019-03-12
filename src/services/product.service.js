import ApiService from './api.service'

const ProductService = {
  getProduct: async function () {
    try {
      const response = await ApiService.get('/order/seller')
      if (response.data.status === 200) {
        return response.data.data
      }

      throw response.data.data
    } catch (error) {
      ApiService.handleError(error)
    }
  }
}

export default ProductService
