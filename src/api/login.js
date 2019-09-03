import request from '@/utils/request'

export function login(datas) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: datas
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
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

export function getVCode(){
  return request({
    url: '/auth/get_vcode',
    method: 'get'
  })
}

export function checkCode(datas){
  return request({
    url: '/auth/check_code',
    method: 'post',
    data:datas
  })
}

export function islogin(){
  return request({
    url: '/auth/islogin',
    method: 'get',
  })
}