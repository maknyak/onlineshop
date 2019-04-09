import axios from 'axios'
import store from '@/store/index'
import { TokenService } from '@/services/storage.service'

class ApiError extends Error {
  constructor (errorType, errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorType = errorType
    this.errorCode = errorCode
  }
}

const ApiService = {
  _401interceptor: null,

  init (baseURL) {
    axios.defaults.baseURL = baseURL
  },

  setHeader () {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`
    axios.defaults.headers.common['appsource'] = process.env.VUE_APP_APPSOURCE
    axios.defaults.headers.common['Accept'] = 'application/json'
  },

  removeHeader () {
    axios.defaults.headers.common = {}
  },

  get (resource) {
    return axios.get(resource)
  },

  post (resource, data) {
    return axios.post(resource, data)
  },

  put (resource, data) {
    return axios.put(resource, data)
  },

  delete (resource) {
    return axios.delete(resource)
  },

  customRequest (data) {
    return axios(data)
  },

  // mount401Interceptor () {
  //   this._401interceptor = axios.interceptors.response.use(
  //     (response) => {
  //       return response
  //     },
  //     async (error) => {
  //       if (error.request.status === 401) {
  //         if (error.config.url.includes('/o/token/')) {
  //           // Refresh token has failed. Logout the user
  //           store.dispatch('auth/logout')
  //           throw error
  //         } else {
  //           // Refresh the access token
  //           try {
  //             await store.dispatch('auth/refreshToken')
  //             // Retry the original request
  //             return this.customRequest({
  //               method: error.config.method,
  //               url: error.config.url,
  //               data: error.config.data
  //             })
  //           } catch (e) {
  //             // Refresh has failed - reject the original request
  //             throw error
  //           }
  //         }
  //       }

  //       // If error was not 401 just reject as is
  //       throw error
  //     }
  //   )
  // },

  // unmount401Interceptor () {
  //   // Eject the interceptor
  //   axios.interceptors.response.eject(this._401interceptor)
  // },

  mount401Interceptor () {
    if (process.env.NODE_ENV === 'development') {
      this._reqInterceptor = axios.interceptors.request.use(config => {
        console.log('Request Interceptor', config)
        return config
      }, error => {
        return Promise.reject(error)
      })
    }

    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') console.log('Response Interceptor', response)
        return response
      },
      error => {
        if (error.response && error.response.status === 401) {
          store.dispatch('auth/forceLogout')
          throw error
        }

        throw error
      }
    )
  },

  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
    axios.interceptors.response.eject(this._reqInterceptor)
  },

  handleError (error) {
    if (error.request.status > 0) {
      const response = JSON.parse(error.request.response)
      throw new ApiError('warning', response.status, response.message)
    } else {
      throw new ApiError('error', error.status, error.message)
    }
  }
}

export default ApiService
export { ApiService, ApiError }
