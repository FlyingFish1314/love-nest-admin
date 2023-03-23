import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    successRequestFn: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.token = token
      }
      return config
    },
    failRequestFn: (err) => {
      return err
    },
    successResponseFn: (res) => {
      return res
    },
    failResponseFn: (err) => {
      return err
    },
  },
})

export default hyRequest
