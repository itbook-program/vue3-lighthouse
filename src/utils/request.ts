import axios from 'axios'
import { removeToken, removeUser } from './auth'
import { message } from 'ant-design-vue';
import { getToken, getUser } from '@/utils/auth'
import { ConfigRequest, ConfigResponse, ErrorConfigResponse } from '@/types/index'
import { encryptData } from '@/utils/crypto'
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

/**
 * reuqest拦截器
 * 可结合业务进行修改
 */
service.interceptors.request.use((config: ConfigRequest) => {
  const token = {
    token: `Bearer ${getToken()}`,
    user: `${getUser()}`
  }
  config.headers = {
    Authorization: encryptData(JSON.stringify(token))
  }
  return config
}, (error: ConfigRequest) => {
  // Do something with request error
  Promise.reject(error)
})

/**
 * response拦截器
 */
service.interceptors.response.use(
  (response: ConfigResponse) => {
    const res = response.data
    if (res && res.success === false) {
      message.error('操作失败，请检查相关信息！')
    }
    return res
  },
  (error: ErrorConfigResponse) => {
    if (error.response && error.response.status === 401) {
      removeToken()
      removeUser()
      if (error.response.data && error.response.data.message === 'wrong username or password') {
        message.error('帐号或密码错误')
      } else {
        message.error('登陆超时')
      }
    } else if (error.response && error.response.status === 500) {
      message.error('服务器出错，请联系开发人员！')
    } else {
      if (error.response.data && error.response.data.error) {
        message.error(error.response.data.error)
      } else {
        message.error('服务器出错，请联系开发人员！')
      }
    }
    return Promise.reject(error)
  }
)

export default service
