// import axios from 'axios'
// import type { AxiosInstance } from 'axios'
// import type { HYRequestInterceptor, HYRequestConfig } from './type'

// import { ElLoading } from 'element-plus'
// import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

// class HYRequest {
//   instance: AxiosInstance
//   interceptors?: HYRequestInterceptor
//   showLoading: boolean
//   loading?: LoadingInstance
//   constructor(config: HYRequestConfig) {
//     this.instance = axios.create(config)
//     this.showLoading = config.showLoading ?? false
//     this.interceptors = config.interceptors

//     // 从config中取出的拦截器是对应的示例的拦截器
//     this.instance.interceptors.request.use(
//       this.interceptors?.requestInterceptor,
//       this.interceptors?.requestInterceptorCatch
//     )
//     this.instance.interceptors.response.use(
//       this.interceptors?.responseInterceptor,
//       this.interceptors?.responseInterceptorCatch
//     )

//     // 添加所有的示例都有的拦截器
//     this.instance.interceptors.request.use(
//       (config) => {
//         if (this.showLoading) {
//           this.loading = ElLoading.service({
//             lock: true,
//             text: '正在请求数据',
//             background: 'rgba(0,0,0,0.3)',
//             fullscreen: true
//           })
//         }
//         return config
//       },
//       (err) => {
//         return err
//       }
//     )
//     this.instance.interceptors.response.use(
//       (res) => {
//         if (this.showLoading) {
//           this.loading?.close()
//         }
//         return res.data
//       },
//       (err) => {
//         if (this.showLoading) {
//           this.loading?.close()
//         }

//         return err
//       }
//     )
//   }

//   request<T>(config: HYRequestConfig): Promise<T> {
//     return new Promise((resolve, reject) => {
//       if (config.interceptors?.requestInterceptor) {
//         config = config.interceptors.requestInterceptor(config)
//       }

//       if (config.showLoading === false) {
//         this.showLoading = config.showLoading
//       }

//       this.instance
//         .request<any, T>(config)
//         .then((res) => {
//           if (config.interceptors?.responseInterceptor) {
//             res = config.interceptors.responseInterceptor(res)
//           }
//           this.showLoading = true

//           resolve(res)
//         })
//         .catch((err) => {
//           this.showLoading = true
//           reject(err)
//         })
//     })
//   }

//   get<T = any>(config: HYRequestConfig): Promise<T> {
//     return this.request({ ...config, method: 'GET' })
//   }

//   post<T = any>(config: HYRequestConfig): Promise<T> {
//     return this.request({ ...config, method: 'POST' })
//   }

//   delete<T = any>(config: HYRequestConfig): Promise<T> {
//     return this.request({ ...config, method: 'DELETE' })
//   }

//   patch<T = any>(config: HYRequestConfig): Promise<T> {
//     return this.request({ ...config, method: 'PATCH' })
//   }
// }

// export default HYRequest

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type {
  YMAxiosRequestConfig,
  YMInterceptors,
  YMInstanceInterceptors
} from './type'

class hyRequest {
  instance: AxiosInstance

  // 创建实例
  constructor(config: YMAxiosRequestConfig<YMInterceptors>) {
    this.instance = axios.create(config)

    //  全局拦截器
    this.instance.interceptors.request.use((config) => {
      // todo
      return config
    })

    this.instance.interceptors.response.use((res) => {
      // todo
      return res.data
    })

    // 私有拦截器(如果有的话，每个实例可以定制化拦截器)
    // axios重复添加拦截器不会被覆盖，会共同存在
    this.instance.interceptors.request.use(
      config.interceptors?.successRequestFn,
      config.interceptors?.failRequestFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.successResponseFn,
      config.interceptors?.failResponseFn
    )
  }

  // 封装网络请求方法
  request<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    // 实例 私有的拦截器
    if (config.interceptors?.successRequestFn) {
      config = config.interceptors.successRequestFn(config)
    }
    // 默认情况下Promise返回的类型是Promise<unknown> Promise方法中的类型就是unknown
    // unknown类型下任何操作都是不合法的，所以要改一些类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 实例 私有的拦截器
          if (config.interceptors?.successResponseFn) {
            res = config.interceptors.successResponseFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  //
  get<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: 'GET', ...config })
  }

  post<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: 'POST', ...config })
  }

  put<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: 'put', ...config })
  }

  delete<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: 'DELETE', ...config })
  }
}

export default hyRequest
