import axios from 'axios'
import router from "@/router.js";
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
// request拦截器
service.interceptors.request.use(
  request=>{
    if(request.method=='post'){
      request.data = {
        ...request.data,
        _t: Date.parse(new Date())/1000,
      }
    }else if(request.method=='get'){
      request.params = {
        _t: Date.parse(new Date())/1000,
        ...request.params
      }
    }
    return request;
  }
)
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
      if (res.code ==201){
        router.push({
          path: "/login",
          query: {redirect: router.currentRoute.fullPath}
        });
      }

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