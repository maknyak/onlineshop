import ApiService from './api.service'
import { TokenService } from './storage.service'

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const UserService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
  **/
  login: async function (email, password) {
    const requestData = {
      method: 'POST',
      baseURL: 'http://10.14.204.19:9139/airlis-backoffice/',
      url: '/auth/login',
      headers: { 'appsource': process.env.VUE_APP_APPSOURCE },
      data: {
        userId: email,
        password: password
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)
      if (response.data.data.status === 200) {
        TokenService.saveToken(response.data.data.data.token)
        ApiService.setHeader()
        return response.data.data.data
      }

      throw response.data.data
    } catch (error) {
      console.log(error.request)
      throw new AuthenticationError(error.status, error.message)
    }
  },

  logout () {
    TokenService.removeToken()
    TokenService.removeRefreshToken()
    ApiService.removeHeader()

    ApiService.unmount401Interceptor()
  }
}

export default UserService
export { UserService, AuthenticationError }
