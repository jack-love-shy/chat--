import request from '../utils/request'

export default {
  login: data => request.get('/user/login', data)
}
