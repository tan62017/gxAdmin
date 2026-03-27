import axios from 'axios'
import { pinia } from '@/stores'

export const AUTHORITY_KEY = 'authority-key=esb-username=admin%26esb-userSecret=95ee7a9f99f94b8ca0cf5521cece0258'

class Http {
  _caches = new Map()
  _instance = null

  constructor({ baseURL } = {}) {
    this.initInstance(baseURL)
    this.initInterceptors()
  }

  initInstance(baseURL = import.meta.env.VITE_APP_HTTP_URL) {
    this._instance = axios.create({
      baseURL,
      timeout: 1000 * 6 * 10
    })
  }

  async initInterceptors() {
    this._instance.interceptors.request.use(config => {
      config.params ||= {}
      config.params.userId = pinia.state.value.user?.userInfo?.id
      return config
    })

    this._instance.interceptors.response.use(response => {
      if (response.status >= 200 && response.status < 300) {
        if (response.config.returnRaw) {
          if (response.config.returnRaw === 'response') return response
          return response.data
        }
        return response.data.data || response.data.dataInfo
      }
      return Promise.reject(response)
    })
  }

  get(url, params = {}, options = {}) {
    const { cacheData, isCache } = this.getCache(url, params)
    if (isCache && cacheData) return Promise.resolve(cacheData)
    return this._instance.get(url, { params, ...options }).then(res => {
      if (isCache !== false) {
        this._caches.set(url + JSON.stringify(params), res)
      }
      return res
    })
  }

  post(url, data = {}, options = {}) {
    const { cacheData, isCache } = this.getCache(url, data)
    if (isCache && cacheData) return Promise.resolve(cacheData)
    return this._instance.post(url, data, options).then(res => {
      if (isCache !== false) {
        this._caches.set(url + JSON.stringify(data), res)
      }
      return res
    })
  }

  getCache(url, params = {}) {
    const cache = params.cache
    delete params.cache
    let cacheData
    if (cache !== false) {
      cacheData = this._caches.get(url + JSON.stringify(params))
    }
    return {
      cacheData,
      isCache: cache === true
    }
  }
}

export const http = new Http()
export const http2 = new Http({ baseURL: import.meta.env.VITE_APP_HTTP_URL2 })
export const http3 = new Http({ baseURL: import.meta.env.VITE_APP_HTTP_URL3 })
