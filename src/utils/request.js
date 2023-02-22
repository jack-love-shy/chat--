import axios from 'axios'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '服务器繁忙'

const service = axios.create({
  baseURL: '/api',
  timeout: 3000
})

service.interceptors.request.use(function (config) {
  const headers = config.headers// eslint-disable-line
  const { token = '' } = Storage.getItem('userInfo') || {}
  if (!headers.authorization) {
    headers.authorization = 'Bearer' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
  const { msg, code, data } = response.data
  if (code === 200) {
    return data
  } else if (code === 402) {
    ElMessage.error(msg)
    return Promise.reject(msg)
  } else {
    ElMessage.error(NETWORK_ERROR)
    return Promise.reject(NETWORK_ERROR)
  }
}, function (error) {
  ElMessage.error(NETWORK_ERROR)
  return Promise.reject(error)
})

function request (options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({ method: item, url, data, ...options })
  }
})

export default request
