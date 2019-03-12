import ApiService from './api.service'

class ProductError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const ProductService = {
  getProduct: async function () {
    try {
      const response = await ApiService.get('/order/seller')
      if (response.data.status === 200) {
        return response.data.data
      }

      throw response.data.data
    } catch (error => this.handleError(error))
  },

  handleError: function (error) {
    if (error.request.status > 0) {
      const response = JSON.parse(error.request.response)
      throw new ProductError(response.status, response.message)
    } else {
      throw new ProductError(error.status, error.message)
    }
  }
}

export default ProductService
export { ProductService, ProductError }
