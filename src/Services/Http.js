import axios from 'axios'

import config from '../config'

class Http {
  static replaceParams (url, params) {
    for (let param in params) {
      url = url.replace(param, params[param])
    }

    return url
  }

  static execute (route, method, options) {
    options = {
      params: {},
      replace: {},
      ...options
    }

    const env = process.env.NODE_ENV
    const configParams = method === 'get'
      ? {
        params: options.params
      }
      : options.params

    const url = Http.replaceParams(config[env][route][method].url, options.replace)

    return axios[method](url, configParams)
  }
}

export default Http
