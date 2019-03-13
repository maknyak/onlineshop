import ApiService from './api.service'

const OrderService = {
  get: async function (type, params) {
    try {
      const requestData = {
        url: `/order/status/${type}`,
        params: params
      }

      const response = await ApiService.customRequest(requestData)
      if (response.data.status === 200) {
        return response.data.data
      }

      throw response.data.data
    } catch (error) {
      ApiService.handleError(error)
    }
  }
}

export default OrderService
