import axios from 'axios'
// import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, 
  baseURL: process.env.VUE_APP_API,
  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 4 * 1000
      // })
      return Promise.reject(Error(res.msg))
    } else {
      return response.data
    }
  },
  error => {
    // console.log('err' + error)
    // Message({
    //   message: '未正常响应',
    //   type: 'error',
    //   duration: 4 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service