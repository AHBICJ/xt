import request from '@/utils/request'

export function login(datas) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: datas
  })
}

export function register(datas) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: datas
  })
}

export function update(datas) {
  return request({
    url: '/auth/update_info',
    method: 'post',
    data: datas
  })
}

export function userinfo(datas) {
  return request({
    url: '/auth/userinfo',
    method: 'get',
    data: datas
  })
}