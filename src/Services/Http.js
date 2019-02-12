import axios from 'axios'

import config from '../config'

class Http {
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

    let url = config[env][route][method].url

    for (let param in options.replace) {
      url = url.replace(param, options.replace[param])
    }

    return axios[method](url, configParams)
  }
}

export default Http
